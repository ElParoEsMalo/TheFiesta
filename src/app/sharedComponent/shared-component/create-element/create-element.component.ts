
import { FormGroups } from './form-group';
import { Component, Input, OnChanges, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FirebaseServiceService } from 'src/app/servicios/firebaseServ/firebase-service.service';

@Component({
  selector: 'app-create-element',
  templateUrl: './create-element.component.html',
  styleUrls: ['./create-element.component.scss'],
})
export class CreateElementComponent implements OnInit, OnChanges {
  @Input() dataModel;
  @Input() action;
  @Output() data: EventEmitter<any> = new EventEmitter();
  campos: Array<string>;
  model: any;
  file: File;
  url: string;
  form: FormGroup;
  image: boolean;
  constructor(private firebaseServ: FirebaseServiceService) {}

  ngOnInit() {}

  ngOnChanges(): void {
    if (this.dataModel !== undefined) {
      this.model = Object.assign({}, this.dataModel);
      this.campos = Object.keys(this.dataModel);
      this.image = this.campos.indexOf('imagen') >= 0;
      console.log(this.image);
      if (this.image) {
        this.url = this.dataModel.imagen;
      }
      this.campos = this.campos.filter((llave) => {
        return (
          !Array.isArray(this.dataModel[llave]) &&
          !(typeof this.dataModel[llave] === 'object') &&
          llave !== 'imagen'
        );
      });
      this.rellenarFormulario();
    }
  }
  changeListener($event): void {
    this.file = $event.target.files[0];
    console.log(this.file.type);
    if(this.file.type.indexOf('image/')>=0){
      this.firebaseServ.uploadPreview(this.file).then((res) => {
        this.url = res;
      });
    }
    console.log(this.file);
  }
  show() {
    document.getElementById('file').click();
  }
  emit(action: string) {
    this.model.imagen = this.url || '';
    this.campos.forEach((llave) => {
      this.model[llave] = this.form.value[llave];
    });
    this.vaciarFormulario();
    console.log(this.model);
    this.data.emit({ data: this.model, action , file: this.file || null});
  }
  rellenarFormulario() {
    this.form = new FormGroup({});
    console.log('rellenar Formulario', this.form, this.campos);
    this.campos.forEach((llave) => {
      FormGroups[llave].value = this.dataModel[llave];
      this.form.addControl(llave, FormGroups[llave]);
    });
  }
  vaciarFormulario() {
    this.form.reset();
    this.campos.forEach((llave) => {
        FormGroups[llave].value = '';
      });
  }
}
