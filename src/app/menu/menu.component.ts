import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            routerLink: ['/']
        },
        {
            label: 'Lingo',
            icon: 'pi pi-star',
            routerLink: ['/lingo']
        },
    ]
}
}
