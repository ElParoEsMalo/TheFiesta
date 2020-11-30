import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
export const FormGroups = {
  longitudMinima: new FormControl("", Validators.minLength(3)),
  letraNumeros: new FormControl(
    "",
    Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(18),
      Validators.pattern("[a-zA-Z0-9]{4,18}"),
    ])
  ),
  regularUno: new FormControl(Validators.pattern("hola[oa]")),
  regularTres: new FormControl("", Validators.pattern("hola[ao]{3}")),
  nombre: new FormControl(
    "",
    Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(18),
      Validators.pattern("[a-zA-Z]{4,18}"),
    ])
  ),
  apellidos: new FormControl(
    "",
    Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(18),
      Validators.pattern("[a-zA-Z]{4,18}"),
    ])
  ),
  fechaNacimiento: new FormControl(
    "",
    Validators.compose([Validators.required])
  ),
  user: new FormControl("", Validators.minLength(3)),
  password: new FormControl(
    "",
    Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(18),
      Validators.pattern("[a-zA-Z0-9]{4,18}"),
    ])
  ),
  cpassword: new FormControl(
    "",
    Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(18),
      Validators.pattern("[a-zA-Z0-9]{4,18}"),
    ])
  ),
};
