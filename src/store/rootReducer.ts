import { combineReducers } from "@reduxjs/toolkit";
import userAuthReducer from "./slices/authSlice";
import userAssessmentReducer from "./slices/platformDesk/assessmentSlice";
import questionReducer from "./slices/platformDesk/questionSlice";
// Import category reducers - separate for general categories vs question categories
import generalCategoryReducer from "./slices/platformDesk/categoriesThunk";
import questionCategoryReducer from "./slices/platformDesk/QuestionCategory";
import coachTypeReducer from "./slices/platformDesk/Session/CoachTypeSlice";
import expertiseReducer from "./slices/platformDesk/Session/ExpertiseThunks";
import specialityReducer from "./slices/platformDesk/Session/Speciality";


 
const rootReducer = combineReducers({
  auth: userAuthReducer,
  assessment: userAssessmentReducer,
  questions: questionReducer,
  generalCategories: generalCategoryReducer,
  questionCategories: questionCategoryReducer,
  coachType: coachTypeReducer,
  expertise: expertiseReducer,
  speciality: specialityReducer,
});

export default rootReducer;
