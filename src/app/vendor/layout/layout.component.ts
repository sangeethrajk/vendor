import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  userDet: any;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private router:Router,public apiCall: ApiService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.userDet=JSON.parse(localStorage.getItem('vendorDet'))
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);

  }
}
