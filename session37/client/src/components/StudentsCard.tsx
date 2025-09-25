import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { type Student } from "../types/type";

interface StudentsCardProps {
  student: Student;
  onEdit: () => void;
  onDelete: () => void;
}

const StudentsCard: React.FC<StudentsCardProps> = ({ student, onEdit, onDelete }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        boxShadow: 1,
        transition: "0.2s",
        "&:hover": { boxShadow: 3, transform: "translateY(-2px)" },
      }}
    >
      <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {student.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Age: {student.age} • Grade: {student.grade}
          </Typography>
        </div>
        <div>
          <IconButton size="small" color="primary" onClick={onEdit}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" onClick={onDelete}>
            <Delete fontSize="small" />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentsCard;
