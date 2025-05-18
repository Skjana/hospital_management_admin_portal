import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements AfterViewInit{

  @ViewChild('sidebar') sidebar!:ElementRef;
  @ViewChild('mainContent') mainContent!: ElementRef;
  @ViewChild('userDropdown') userDropdown!: ElementRef;
  dropdownActive = false;

  constructor(private renderer: Renderer2) {
    this.renderer.listen('document', 'click', () => {
      if (this.dropdownActive) {
        this.dropdownActive = false;
      }
    });
  }
  ngAfterViewInit() {
    const sidebarTitles = document.querySelectorAll('.sidebar-title');
    sidebarTitles.forEach(title => {
      this.renderer.listen(title, 'click', (event) => {
        this.renderer.addClass(event.target, 'collapsed');
        const menuContainer = event.target.nextElementSibling;
        if (menuContainer) {
          this.renderer.addClass(menuContainer, 'collapsed');
        }
      });
    });
  }

  toggleSidebar() {
    this.renderer.addClass(this.sidebar.nativeElement, 'collapsed');
    this.renderer.addClass(this.mainContent.nativeElement, 'expanded');
  }

  toggleUserDropdown(event: Event) {
    event.stopPropagation();
    this.dropdownActive = !this.dropdownActive;
  }

  toggleSidebarSection(event: Event) {
    const title = event.currentTarget as HTMLElement;
    title.classList.toggle('collapsed');
    
    const menuContainer = title.nextElementSibling as HTMLElement;
    if (menuContainer) {
      menuContainer.classList.toggle('collapsed');
    }
  }

}
