// SegmentsForm.tsx
import React, {
    useCallback,
    useMemo,
    useState,
    useEffect,
  } from "react";
  import { DndProvider } from "react-dnd";
  import { HTML5Backend } from "react-dnd-html5-backend";
  import { Tree } from "@minoru/react-dnd-treeview";
  import { GripVertical, Check, X, ChevronRight, Pencil } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { useDispatch, useSelector } from "react-redux";
  import type { AppDispatch } from "@/store";
  import { 
    fetchSegments, 
    createSegment, 
    updateSegment,
    moveSegment,
    type Segment 
  } from "@/store/slices/platformDesk/segmentThunk";
  import { selectSegments } from "@/store/slices/platformDesk/assessmentSlice";
  

  export type NodeId = string | number;
  
  export type NodeModel<T = unknown> = {
    id: NodeId;
    parent: NodeId;
    text: string;
    droppable?: boolean;   
    
    data?: T;
  };
  
  export type DropOptions<T = unknown> = {
    dragSource?: NodeModel<T>;
    dropTarget?: NodeModel<T>;
    dropTargetId?: NodeId;
    relativeIndex?: number;
    depth?: number;
  };
  
  export type SegmentNodeData = { kind: "SEGMENT" };
  export type SegmentNode = NodeModel<SegmentNodeData>;
  export const SEG_ROOT = "SEG_ROOT";
  
  /* =========================================================
     Transform API Segment data to NodeModel format
  ========================================================= */
  function transformSegmentsToNodes(segments: Segment[]): SegmentNode[] {
    const nodes: SegmentNode[] = [];
    
    const processSegment = (seg: Segment, parentId: NodeId) => {
      // Add the segment itself
      const segmentId = `seg:${seg.id}`;
      nodes.push({
        id: segmentId,
        parent: parentId,
        text: seg.label,
        droppable: true,
        data: { kind: "SEGMENT" },
      });
      
      // Process children recursively
      if (seg.children && seg.children.length > 0) {
        seg.children.forEach((child) => {
          processSegment(child, segmentId);
        });
      }
    };
    
    // Process all root segments
    segments.forEach((seg) => {
      processSegment(seg, SEG_ROOT);
    });
    
    return nodes;
  }
  

  function extractSegmentId(nodeId: NodeId): string {
    const str = String(nodeId);
    return str.replace('seg:', '');
  }
  

  const INDENT_W = 20;
  
  function buildChildrenIndex<T extends { id: NodeId; parent: NodeId }>(nodes: T[]) {
    const byParent = new Map<NodeId, T[]>();
    nodes.forEach((n) => {
      const list = byParent.get(n.parent) ?? [];
      list.push(n);
      byParent.set(n.parent, list);
    });
    return byParent;
  }
  
  /* =========================================================
     Row (inline edit)
  ========================================================= */
  type RowProps = {
    node: SegmentNode;
    depth: number;
    isOpen?: boolean;
    onToggle?: () => void;
  
    selected: boolean;
    hidden: boolean;
    onSelect: () => void;
  
    hasKids: boolean;
  
    editing: boolean;
    draft: string;
    onEditStart: () => void;
    onEditChange: (v: string) => void;
    onEditCancel: () => void;
    onEditSave: () => void;
  
    // if undefined => treat as NOT draggable (root)
    dragHandle?: (el: HTMLDivElement | null) => void;
  };
  
  const Row = React.memo(function Row({
    node,
    depth,
    isOpen,
    onToggle,
    selected,
    hidden,
    onSelect,
    hasKids,
    editing,
    draft,
    onEditStart,
    onEditChange,
    onEditCancel,
    onEditSave,
    dragHandle,
  }: RowProps) {
    if (hidden) return null;
  
    return (
      <div className="mb-1" style={{ marginLeft: depth * INDENT_W }}>
        <div className={`rounded border ${selected ? "border-blue-400 bg-blue-50" : "border-gray-200 bg-white"}`}>
          <div className="flex items-center px-2 py-1.5">
            {hasKids ? (
              <button
                aria-label="Toggle"
                className="mr-1 h-6 w-6 rounded hover:bg-gray-100"
                onClick={onToggle}
                type="button"
              >
                <ChevronRight size={16} className={`mx-auto transition-transform ${isOpen ? "rotate-90" : ""}`} />
              </button>
            ) : (
              <div className="mr-1 h-6 w-6" />
            )}
  
            <div
              className={`mr-2 ${dragHandle ? "text-gray-400 cursor-grab" : "text-gray-300"}`}
              title={dragHandle ? "Drag to move" : "Root cannot be dragged"}
              ref={dragHandle}
            >
              <GripVertical size={16} />
            </div>
  
            <div className="flex-1 text-sm leading-6" onClick={!editing ? onSelect : undefined}>
              {editing ? (
                <input
                  autoFocus
                  value={draft}
                  onChange={(e) => onEditChange(e.target.value)}
                  className="w-full rounded border px-2 py-1 text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") onEditSave();
                    if (e.key === "Escape") onEditCancel();
                  }}
                />
              ) : (
                <span className={`${selected ? "text-blue-900 font-medium" : "text-gray-800"}`}>{node.text}</span>
              )}
            </div>
  
            <div className="ml-2 flex items-center gap-1">
              {editing ? (
                <>
                  <button
                    aria-label="Save"
                    className="h-7 w-7 grid place-items-center rounded hover:bg-green-50 text-green-700"
                    onClick={onEditSave}
                  >
                    <Check size={16} />
                  </button>
                  <button
                    aria-label="Cancel"
                    className="h-7 w-7 grid place-items-center rounded hover:bg-red-50 text-red-700"
                    onClick={onEditCancel}
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <button
                  aria-label="Edit name"
                  className="h-7 w-7 grid place-items-center rounded hover:bg-gray-100"
                  onClick={onEditStart}
                >
                  <Pencil size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  });
  

  function SegmentsForm({
    tree,
    value,
    onValueChange,
    className,
    dispatch,
  }: {
    tree: SegmentNode[];
    value: NodeId | null;
    onValueChange: (id: NodeId | null) => void;
    className?: string;
    dispatch: AppDispatch;
  }) {
    const [newName, setNewName] = useState("");
    const [editingId, setEditingId] = useState<NodeId | null>(null);
    const [editDraft, setEditDraft] = useState("");
  
    // ensure all nodes are droppable so you can drop onto any node (roots included)
    const normalizedTree = useMemo<SegmentNode[]>(
      () => tree.map((n) => (n.droppable ? n : { ...n, droppable: true })),
      [tree]
    );
  
    const byParent = useMemo(() => buildChildrenIndex(normalizedTree), [normalizedTree]);
    const byId = useMemo(() => {
      const m = new Map<NodeId, SegmentNode>();
      normalizedTree.forEach((n) => m.set(n.id, n));
      return m;
    }, [normalizedTree]);
  
    const hasChildren = useCallback((id: NodeId) => (byParent.get(id) ?? []).length > 0, [byParent]);
    const includedIds = useMemo(() => new Set<NodeId>(normalizedTree.map((n) => n.id)), [normalizedTree]);
  
    // --- KEY RULE: roots are NOT draggable
    const canDrag = useCallback((node?: SegmentNode) => {
      if (!node) return true;
      return node.parent !== SEG_ROOT; // only non-root nodes can be dragged
    }, []);
  
    // forbid dropping directly onto the virtual root only
    const canDrop = useCallback(
      (_t: SegmentNode[], { dropTargetId }: DropOptions) => {
        if (dropTargetId === SEG_ROOT) return false;
        return true;
      },
      []
    );
  
    // Helper to check if targetId is a descendant of nodeId
    const isDescendant = useCallback((nodeId: NodeId, targetId: NodeId): boolean => {
      let current = byId.get(targetId);
      while (current && current.parent !== SEG_ROOT) {
        if (current.parent === nodeId) return true;
        current = byId.get(current.parent);
      }
      return false;
    }, [byId]);

    const handleDrop = useCallback(
      async (_newTree: SegmentNode[], opts?: DropOptions) => {
        // Safety net: in case canDrag is bypassed somehow, block moving a root under anything.
        if (opts?.dragSource && (opts.dragSource.parent === SEG_ROOT) && opts.dropTargetId && opts.dropTargetId !== SEG_ROOT) {
          // ignore root move
          return;
        }
        if (opts?.dropTargetId === SEG_ROOT) return; // final guard

        const dragSource = opts?.dragSource;
        const dropTargetId = opts?.dropTargetId;

        if (!dragSource || !dropTargetId) {
          return;
        }

        // Prevent dropping on itself
        if (dragSource.id === dropTargetId) {
          console.warn("Cannot drop on itself");
          return;
        }

        // Prevent dropping on its own descendant
        if (isDescendant(dragSource.id, dropTargetId)) {
          console.warn("Cannot drop on a descendant");
          return;
        }

        // Extract actual IDs
        const segmentId = extractSegmentId(dragSource.id);
        const newParentId = extractSegmentId(dropTargetId);

        try {
          // Call the move API
          await dispatch(moveSegment({ id: segmentId, parent_id: newParentId })).unwrap();
          
          // Refresh segments from API to get the updated tree
          await dispatch(fetchSegments());
        } catch (error) {
          console.error("Error moving segment:", error);
          // Don't update the tree if the API call fails
        }
      },
      [dispatch, isDescendant]
    );
  
    // Add under root => parent; add under selected => child
    const addUnder = useCallback(async () => {
      const title = newName.trim();
      if (!title) return;

      const parentId = value ?? SEG_ROOT;

      try {
        if (parentId === SEG_ROOT) {
          // Create root segment (parent_id = 0)
          await dispatch(createSegment({ title, parent_id: 0, status: 1 })).unwrap();
        } else {
          // Create child segment with parent_id
          const actualParentId = extractSegmentId(parentId);
          await dispatch(createSegment({ title, parent_id: actualParentId, status: 1 })).unwrap();
        }
        
        // Refresh segments from API
        await dispatch(fetchSegments());
        setNewName("");
      } catch (e) {
        console.error("Error adding segment:", e);
      }
    }, [newName, value, dispatch]);
  
    // Inline edit
    const startEdit = useCallback(
      (id: NodeId) => {
        const n = byId.get(id);
        if (!n) return;
        setEditingId(id);
        setEditDraft(String(n.text ?? ""));
      },
      [byId]
    );
  
    const cancelEdit = useCallback(() => {
      setEditingId(null);
      setEditDraft("");
    }, []);
  
    const saveEdit = useCallback(async () => {
      if (editingId == null) return;
      const title = editDraft.trim();
      if (!title) return;

      setEditingId(null);
      setEditDraft("");

      try {
        const actualId = extractSegmentId(editingId);
        const node = normalizedTree.find(n => n.id === editingId);
        
        if (!node) return;
        
        // Determine if this is a root segment or child segment
        if (node.parent === SEG_ROOT) {
          // Root segment - update segment with parent_id = 0
          await dispatch(updateSegment({ id: actualId, title, parent_id: 0, status: 1 })).unwrap();
        } else {
          // Child segment - update segment with parent_id
          const parentActualId = extractSegmentId(node.parent);
          await dispatch(updateSegment({ 
            id: actualId, 
            title, 
            parent_id: parentActualId,
            status: 1 
          })).unwrap();
        }
        
        // Refresh segments from API
        await dispatch(fetchSegments());
      } catch (e) {
        console.error("Error updating segment:", e);
      }
    }, [editingId, editDraft, normalizedTree, dispatch]);
  
    const handleSelectRow = useCallback(
      (id: NodeId) => {
        if (value === id) onValueChange(null);
        else onValueChange(id);
      },
      [value, onValueChange]
    );
  
    return (
      <div className={className}>
        {/* Toolbar */}
        <div className="text-sm font-medium text-gray-900 mb-2">Segments</div>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <input
            className="w-[260px] rounded border bg-white p-2 text-sm"
            placeholder={`New ${value ? "child" : "parent"} name`}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addUnder()}
          />
          <Button variant="outline" type="button" onClick={addUnder} className="h-8 px-3">
            Add under {value ? "selected" : "root"}
          </Button>
        </div>
  
        {/* Tree */}
        <DndProvider backend={HTML5Backend}>
          <Tree
            tree={normalizedTree}
            rootId={SEG_ROOT}
            canDrag={canDrag}
            canDrop={canDrop}
            onDrop={handleDrop}
            render={(node, params) => {
              const { depth, isOpen, onToggle } = params;
              const isRootNode = (node.parent === SEG_ROOT);
              const dragHandle = isRootNode ? undefined : (params as any).dragHandle as RowProps["dragHandle"];
              const leaf = !hasChildren(node.id);
  
              return (
                <Row
                  node={node as SegmentNode}
                  depth={depth}
                  isOpen={isOpen}
                  onToggle={leaf ? undefined : onToggle}
                  selected={value === node.id}
                  hidden={!includedIds.has(node.id)}
                  onSelect={() => handleSelectRow(node.id)}
                  hasKids={!leaf}
                  editing={editingId === node.id}
                  draft={editingId === node.id ? editDraft : ""}
                  onEditStart={() => startEdit(node.id)}
                  onEditChange={setEditDraft}
                  onEditCancel={cancelEdit}
                  onEditSave={saveEdit}
                  dragHandle={dragHandle}
                />
              );
            }}
          />
        </DndProvider>
      </div>
    );
  }
  
  
  export function SegmentsDrawer({
    open,
    onClose,
    onSave,
  }: {
    open: boolean;
    onClose: () => void;
    onSave?: (segments: Segment[]) => void;
  }) {
    const dispatch = useDispatch<AppDispatch>();
    const apiSegments = useSelector(selectSegments);
    const [selected, setSelected] = useState<NodeId | null>(null);
  
    // Transform API segments to tree nodes
    const tree = useMemo(() => {
      return transformSegmentsToNodes(apiSegments);
    }, [apiSegments]);
  
    // Fetch segments on mount
    useEffect(() => {
      if (open) {
        dispatch(fetchSegments());
      }
    }, [open, dispatch]);
  
    if (!open) return null;
  
    return (
      <div className="fixed inset-0 z-50">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
  
        {/* Panel */}
        <div className="absolute right-0 top-0 h-full w-full sm:w-[560px] lg:w-[720px] bg-white shadow-2xl border-l flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-6">
            <div className="text-xl font-semibold">Segments</div>
            <div className="flex gap-2" />
          </div>
  
          {/* Body */}
          <div className="flex-1 min-h-0 overflow-y-auto p-6">
            <SegmentsForm 
              tree={tree} 
              value={selected} 
              onValueChange={setSelected}
              dispatch={dispatch}
            />
          </div>
  
          {/* Footer */}
          <div className="border-t p-6 flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <div className="flex gap-2">
              <Button
                variant="brand"
                onClick={() => {
                  onSave?.(apiSegments);
                  onClose();
                }}
              >
                Save & Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
 
  export function SegmentsDrawerTrigger() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="standard" size="new" onClick={() => setOpen(true)}>Segments</Button>
        <SegmentsDrawer open={open} onClose={() => setOpen(false)} />
      </>
    );
  }
  