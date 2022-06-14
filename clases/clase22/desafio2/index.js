import { schema, normalize, denormalize } from 'normalizr';
import holding from './holding.json' assert {type:"json"};

//NORMALIZAR//
const employeeSchema = new schema.Entity('employees');
const companySchema = new schema.Entity('companies', {
    gerente: employeeSchema,
    encargado: employeeSchema,
    empleados: [employeeSchema]
});

const holdingSchema = new schema.Entity('holdings', {
    empresas: [companySchema]
});

let normalizedData = normalize(holding, holdingSchema);
console.log(JSON.stringify(normalizedData, null, '\t'));


