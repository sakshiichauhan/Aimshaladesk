// import { Card, CardHeader } from "@/components/ui/card";


// export default function CardComponent({stats}:{stats:any}){
//     return (
//         <div className="grid gap-4 xl:gap-1 md:grid-cols-2 xl:grid-cols-3">
//           {stats.map((stat, index) => (
//             <Card key={index} className="xl:rounded-sm shadow-none bg-[var(--background)]">
//               <CardHeader className="flex-col items-center px-4 gap-4 py-0 h-full">
//                 <div className="flex justify-between h-full items-center">
//                   <div
//                     className={`${color} text-xs uppercase text-light line-clamp-1`}
//                   >
//                     {stat.title}
//                   </div>
//                   {stat.performance}
//                 </div>
//                 <div className="flex  items-center gap-4">
//                   <div className={`rounded-full `}>
//                     <stat.icon className={`h-8 w-8 ${color2}`} />
//                   </div>
//                   <div className={`${color2} text-2xl`}>{stat.value}</div>
//                 </div>
//               </CardHeader>
//             </Card>
//           ))}
//         </div>
//       );
// }