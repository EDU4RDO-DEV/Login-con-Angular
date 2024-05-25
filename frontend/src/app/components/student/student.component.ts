import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student/student.service';
import { PersonaEstudiante } from 'src/app/models/personaEstudiante';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students: PersonaEstudiante[] = [];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((data: any[]) => {
      if (Array.isArray(data) && data.every(item => this.isPersonaEstudiante(item))) {
        this.students = data;
        console.log(this.students);
      } else {
        console.error('Los datos recibidos no son un array de estudiantes');
      }
    });
  }

  private isPersonaEstudiante(item: any): item is PersonaEstudiante {
    return item && typeof item.idEstudiante === 'number' && typeof item.añoIngreso === 'number' &&
      typeof item.estado === 'string' && typeof item.carne === 'string';
  }
}