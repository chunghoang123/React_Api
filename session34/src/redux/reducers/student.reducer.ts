import type { Student } from "../../utils/types";

const studentLocal = localStorage.getItem("students");

const studentInitial: Student[] = studentLocal ? JSON.parse(studentLocal) : [];

type ActionTypes = {
  type: "ADD" | "EDIT" | "DELETE" | "SEARCH" | "FILTER";
  payload: Student;
};

const studentReducer = (state = studentInitial, action: ActionTypes) => {
  switch (action.type) {
    case "ADD": {
      const stuentClones = [...state, action.payload];

      // Lưu dữ liệu lên localStorage
      localStorage.setItem("students", JSON.stringify(stuentClones));
      return stuentClones;
    }

    case "DELETE": {
      const filterStudent = state.filter((st) => st.id !== action.payload.id);

      // Lưu dữ liệu lên localStorage
      localStorage.setItem("students", JSON.stringify(filterStudent));
      return filterStudent;
    }

    case "SEARCH": {
      const studentClones = [...state];
      if (action.payload.name) {
        const searctStudent = studentClones.filter((student) =>
          (student.name ?? "")
            .toLowerCase()
            .includes((action.payload.name ?? "").toLowerCase())
        );
        return searctStudent;
      } else {
        return studentInitial;
      }
    }

    case "EDIT":{
      const studenttemp:Student[] = state.map((e) =>
        e.id == action.payload.id
          ? {
              ...e,
              name: action.payload.name,
              gender: action.payload.gender,
              birthday: action.payload.birthday,
              hometown: action.payload.hometown,
              address: action.payload.address,
            }
          : e
      );
      localStorage.setItem("students", JSON.stringify(studenttemp));
      return studenttemp}
    default:
      break;
  }

  return state;
};

export default studentReducer;
