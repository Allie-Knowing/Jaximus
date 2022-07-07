export class InquiryCategory {
  id: number;

  title: string;
  
  constructor(obj) {
    return Object.assign(this, obj);
  }
}
