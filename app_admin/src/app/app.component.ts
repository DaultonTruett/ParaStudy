import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDivider } from '@angular/material/divider';
import { MatList, MatListItem } from '@angular/material/list'

import { AuthenticationService } from './services/authentication.service';
import { ListMedicationsComponent } from './list-medications/list-medications.component';
import { FooterComponent } from './footer/footer.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule,
    ListMedicationsComponent, FooterComponent,
    MatSidenavModule, MatIconModule, MatButtonModule, MatToolbarModule,
    MatDivider, MatListItem, MatList
  ],
})
export class AppComponent implements OnInit{
  title = 'PARASTUDY';

  constructor(
    private authenticationService: AuthenticationService
    ){}
  
  ngOnInit(){}

  public isLoggedIn(): boolean{
    return this.authenticationService.isLoggedIn();
  };

  public onLogout(): void{
    return this.authenticationService.logout();
  };

  public sidenavState(): boolean {
    let width!: number;
    window.addEventListener("resize", function(event) {
      width = document.body.clientWidth;
    });
    if (width > 800){
      return true;
    }
    return false;
  }

}
