export type CVData = {
  name: string;
  title: string;
  photoUrl: string;
  introduction: string; // html
  contactInfo: {
    email: string;
    phone: string;
    address: string;
    linkedin: string;
    skype: string;
    github: string;
  };
  skills: {
    name: string;
    years: number;
  }[];
  education: {
    name: string;
    degree: string;
    startYear: number;
    endYear: number;
  }[];
  languages: {
    name: string;
    level: string;
  }[];
  experience: {
    position: string;
    project: string;
    company: string;
    description: string; // html
    startDate: string;
    endDate: string;
  }[];
  openSource: {
    name: string;
    url: string;
  }[];
  awards: {
    name: string;
    competition: string;
  }[];
};
