import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-student-excel-upload',
  templateUrl: './student-excel-upload.component.html',
  styleUrls: ['./student-excel-upload.component.css']
})
export class StudentExcelUploadComponent {
  data: any[] | undefined; 
  http: any;

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
  
    if (target.files.length !== 1) throw new Error('No se puede cargar múltiples archivos');
  
    const reader: FileReader = new FileReader();
  
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
  
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
  
      const wsname: string = wb.SheetNames[0];
  
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  
      // Convertir la hoja de cálculo a un array de objetos en lugar de un array de arrays
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];
  
      // Mapear los datos a un array de objetos con las propiedades No, Carné, Alumno y Correo Electrónico
      this.data = data.map((row: any[]) => ({
        No: row[0],
        Carné: row[1],
        Alumno: row[2],
        'Correo Electrónico': row[3],
      }));
    };
  
    reader.readAsBinaryString(target.files[0]);
  }

  uploadData() {
    this.http.post('http://tu-api.com/ruta', this.data)
      .subscribe((response: any) => {
        console.log(response);
      }, (error: any) => {
        console.error(error);
      });
  }
}