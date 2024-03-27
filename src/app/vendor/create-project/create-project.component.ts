import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendorService } from '../../services/vendor.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})

export class CreateProjectComponent {

  createForm: FormGroup;
  allWorkData: any[] = [];
  workList: any[] = [];
  agreementNumberList: any[] = [];
  username: any;
  vendorId: any;

  divisions = [
    "Anna Nagar",
    "JJ Nagar",
    "KK Nagar",
    "Besant Nagar",
    "Nandanam",
    "Maintenance",
    "SPD I",
    "SPD II",
    "CIT Nagar",
    "Foreshore Estate",
    "SAF Games Village",
    "Thirumazhisai Satellite Town",
    "SPD III",
    "Uchapatti Thoppur Satellite Town",
    "Coimbatore Housing Unit",
    "Erode Housing Unit ",
    "Salem Housing Unit ",
    "Hosur Housing Unit ",
    "Vellore Housing Unit ",
    "Madurai Housing Unit ",
    "Tirunelveli Housing Unit",
    "Ramanathapuram Housing Unit",
    "Trichy Housing Unit",
    "Thanjavur Housing Unit",
    "Villupuram Housing Unit"
  ];

  constructor(
    private fb: FormBuilder,
    private vendorService: VendorService,
    private toastService: ToastService,
  ) {
    this.createForm = this.fb.group({
      division: ['', Validators.required],
      nameOfTheWork: ['', Validators.required],
      agreementNumber: ['', Validators.required],
      agreementValue: ['', Validators.required],
      agreementDate: ['', Validators.required],
      commencementDate: ['', Validators.required],
      completionDate: ['', Validators.required],
      bankName: ['', Validators.required],
      accountNumber: ['', Validators.required],
      accountHolderName: ['', Validators.required],
      ifscCode: ['', Validators.required],
      branchName: ['', Validators.required],
      workId: [''],
      projectStatus: ['']
    });
  }

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
    this.getVendorId();
  }

  getVendorId() {
    this.vendorService.getVendorIdByUsername(this.username).subscribe(
      (response: any) => {
        this.vendorId = response.data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  onDivisionChange() {
    this.workList = [];
    const division = this.createForm.get('division')?.value;
    this.vendorService.getAllWorks(division).subscribe(
      (response: any) => {
        this.allWorkData = response;
        response.forEach((work: any) => {
          this.workList.push(work.nameOfTheWork);
          this.agreementNumberList.push(work.agreementNumber);
        });
        console.log(this.workList);
      },
      (error: any) => {
        console.error('Error in fetching  all works : ', error);
      }
    );
  }

  onAgreementNoChange() {
    const selectedAgreementNumber = this.createForm.get('agreementNumber')?.value;
    const selectedWork = this.allWorkData.find((work: any) => work.agreementNumber === selectedAgreementNumber);
    if (selectedWork) {
      console.log(selectedWork);
      this.createForm.patchValue({
        agreementValue: selectedWork.agreementValue,
        agreementDate: selectedWork.agreementDate,
        commencementDate: selectedWork.commencementDate,
        completionDate: selectedWork.completionDate,
        workId: selectedWork.id
      });
    }
  }

  onSubmit() {
    if (this.createForm.valid) {
      const vendorId: string = this.vendorId.toString();
      const workId: string = this.createForm.get('workId')?.value.toString();
      const data = {
        division: this.createForm.get('division')?.value,
        workId: workId,
        vendorId: vendorId,
        bankName: this.createForm.get('bankName')?.value,
        accountNumber: this.createForm.get('accountNumber')?.value,
        accountHolderName: this.createForm.get('accountHolderName')?.value,
        ifscCode: this.createForm.get('ifscCode')?.value,
        branchName: this.createForm.get('branchName')?.value,
        projectStatus: "Pending"
      };
      console.log(data);
      this.vendorService.createVendorProject(data).subscribe(
        (response: any) => {
          console.log(response);
        },
        (error: any) => {
          console.error(error.error.message);
          if (error.error.message === "Error: A project with the same workId and vendorId already exists") {
            this.toastService.showToast('error', 'You have already created this Project', '');
          }
        }
      );
    } else {
      window.alert('Please fill all the fields');
      this.toastService.showToast('warning', 'Please fill all the fields', '');
    }
  }

}
