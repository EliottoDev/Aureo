import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { 
  Home,
  CreditCard,
  BarChart2,
  Wallet,
  User,
  Settings,
  MoreVertical,
  Bell,
  LucideAngularModule
} from 'lucide-angular';

interface NavItem {
  label: string;
  path: string;
  icon: string;
  notification?: number;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    CommonModule,
    RouterLinkActive,
    LucideAngularModule
  ]
})
export class NavbarComponent {
  // Navigation items
  navItems: NavItem[] = [
    { label: 'Dashboard', path: '/', icon: 'home' },
    { label: 'Wallet', path: '/wallet', icon: 'wallet' },
    { label: 'Inversions', path: '/inversions', icon: 'bar-chart-2' },
    { label: 'Notifications', path: '/notifications', icon: 'bell', notification: 3 },
    { label: 'Settings', path: '/settings', icon: 'settings' }
  ];

  // Icons
  HomeIcon = Home;
  WalletIcon = Wallet;
  BarChartIcon = BarChart2;
  BellIcon = Bell;
  SettingsIcon = Settings;
  MoreVerticalIcon = MoreVertical;
  
  // Get icon component
  getIcon(iconName: string): any {
    switch(iconName) {
      case 'home': return this.HomeIcon;
      case 'wallet': return this.WalletIcon;
      case 'bar-chart-2': return this.BarChartIcon;
      case 'bell': return this.BellIcon;
      case 'settings': return this.SettingsIcon;
      case 'more-vertical': return this.MoreVerticalIcon;
      default: return this.HomeIcon;
    }
  }

  constructor(private router: Router) { }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

}
