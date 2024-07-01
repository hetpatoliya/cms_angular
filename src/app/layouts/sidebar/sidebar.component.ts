import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  selectedField = 'media';
  role = sessionStorage.getItem('role');

  clickEvent(event: any) {
    const value = (event.target as HTMLAnchorElement).getAttribute('value');
    this.selectedField = value || '';
  }
}
