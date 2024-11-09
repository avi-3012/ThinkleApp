export type PopulationData = {
  ID_Nation: string;
  Nation: string;
  ID_Year: number;
  Year: string;
  Population: number;
  Slug_Nation: string;
};

type SourceAnnotation = {
  source_name: string;
  source_description: string;
  dataset_name: string;
  dataset_link: string;
  table_id: string;
  topic: string;
  subtopic: string;
};

type Source = {
  measures: string[];
  annotations: SourceAnnotation;
  name: string;
  substitutions: any[];
};

export type PopulationApiResponse = {
  data: PopulationData[];
  source: Source[];
};
