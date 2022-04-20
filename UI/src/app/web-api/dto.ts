export class InputDataDto {
  public Cylinders!: string;
  public Displacement!: string;
  public Horsepower!: string;
  public Weight!: string;
  public Acceleration!: string;
  public "Model year"!: string;
  public Origin!: string;
}



export interface PredictionCVSDto {
  cylinders: string;
  weight: string;
  displacement: string;
  horsepower: string;
  acceleration: string;
  model_year: string;
  origin: string;
}
