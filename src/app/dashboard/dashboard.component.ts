import { formatNumber, formatDate, CommonModule, NgClass, NgStyle } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { 
  ChevronDown, 
  CreditCard, 
  DollarSign, 
  Home, 
  PiggyBank, 
  Plus, 
  Search, 
  ShoppingBag, 
  TrendingDown, 
  TrendingUp, 
  Wallet,
  LucideAngularModule,
  BarChart,
  LucideIconProvider,
  Utensils,
  Car,
  FileText,
  Film,
  Filter,
  Laptop,
  BookOpen,
  Dumbbell,
  Bitcoin,
  Banknote,
  Repeat,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Info,
} from 'lucide-angular';

interface Transaction {
  id: number;
  title?: string; 
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense' | 'transfer';
  date: Date;
  icon: any;
  color: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
  reference: string;
  tags?: string[];
  notes?: string;
  [key: string]: any; 
}

interface SummaryCard {
  title: string;
  amount: number;
  icon: any;
  trend: 'up' | 'down';
  change: number;
  style: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    LucideAngularModule,
    CommonModule,
    NgClass,
    NgStyle
  ],
  providers: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // Datos para el gráfico de gastos
  spendingData: number[] = [1200, 1900, 1500, 2000, 1800, 2200, 2500];
  spendingLabels: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  // Lucide Icons
  readonly BarChart = BarChart;
  readonly ChevronDown = ChevronDown;
  readonly CreditCard = CreditCard;
  readonly DollarSign = DollarSign;
  readonly Home = Home;
  readonly PiggyBank = PiggyBank;
  readonly Plus = Plus;
  readonly Search = Search;
  readonly ShoppingBag = ShoppingBag;
  readonly TrendingDown = TrendingDown;
  readonly TrendingUp = TrendingUp;
  readonly Wallet = Wallet;
  readonly Utensils = Utensils;
  readonly Car = Car;
  readonly FileText = FileText;
  readonly Film = Film;
  readonly Filter = Filter;
  readonly Laptop = Laptop;
  readonly BookOpen = BookOpen;
  readonly Dumbbell = Dumbbell;
  readonly Bitcoin = Bitcoin;
  readonly Banknote = Banknote;
  readonly Repeat = Repeat;
  readonly Smartphone = Smartphone;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;
  readonly Info = Info;

  // Filters
  categories = ['All', 'Income', 'Expenses', 'Transfers'];
  selectedCategory = 'All';
  timeFilter: 'week' | 'month' | 'year' = 'month';

  // Datos de ejemplo
  private total = 12458.90;
  formattedTotal: string;
  private income = 3245.50;
  formattedIncome: string;
  private expenses = 1876.30;
  formattedExpenses: string;
  private savings = 1369.20;
  formattedSavings: string;

  // Datos para la tabla de gastos por categoría
  spendingCategories = [
    { 
      name: 'Shopping', 
      amount: 650.50, 
      percentage: 35,
      icon: this.ShoppingBag,
      color: '#8B5CF6' 
    },
    { 
      name: 'Food & Drinks', 
      amount: 320.75, 
      percentage: 17,
      icon: this.Utensils,
      color: '#10B981' 
    },
    { 
      name: 'Transportation', 
      amount: 285.30, 
      percentage: 15,
      icon: this.Car,
      color: '#3B82F6' 
    },
    { 
      name: 'Bills', 
      amount: 420.00, 
      percentage: 22,
      icon: this.FileText,
      color: '#F59E0B' 
    },
    { 
      name: 'Entertainment', 
      amount: 199.75, 
      percentage: 11,
      icon: this.Film,
      color: '#EC4899' 
    }
  ];
  
  // Total de gastos para calcular porcentajes
  totalSpent: number = 0;

  // Sample data for recent transactions
  recentTransactions: Transaction[] = [
    {
      id: 1,
      title: 'Grocery Store',
      description: 'Weekly groceries',
      amount: 156.80,
      type: 'expense',
      category: 'Groceries',
      date: new Date('2023-11-15T14:30:00'),
      icon: this.ShoppingBag,
      color: '#8B5CF6',
      status: 'completed',
      paymentMethod: 'Credit Card',
      reference: 'POS-123456',
      tags: ['food', 'essentials']
    },
    {
      id: 2,
      title: 'Salary Deposit',
      description: 'Monthly salary',
      amount: 2500.00,
      type: 'income',
      category: 'Salary',
      date: new Date('2023-11-10T09:00:00'),
      icon: this.DollarSign,
      color: '#10B981',
      status: 'completed',
      paymentMethod: 'Bank Transfer',
      reference: 'SAL-2023-11',
      notes: 'Monthly salary deposit'
    },
    {
      id: 3,
      title: 'Electric Bill',
      description: 'Monthly electricity bill',
      amount: 89.90,
      type: 'expense',
      category: 'Bills',
      date: new Date('2023-11-05T16:45:00'),
      icon: this.FileText,
      color: '#F59E0B',
      status: 'pending',
      paymentMethod: 'Direct Debit',
      reference: 'ELEC-789012',
      notes: 'Auto-pay scheduled for tomorrow'
    },
    {
      id: 4,
      title: 'Restaurant',
      description: 'Dinner with friends',
      amount: 65.40,
      type: 'expense',
      category: 'Dining',
      date: new Date('2023-11-01T20:15:00'),
      icon: this.Utensils,
      color: '#EC4899',
      status: 'completed',
      paymentMethod: 'Mobile Payment',
      reference: 'RST-345678',
      tags: ['social', 'food']
    },
    {
      id: 5,
      title: 'Freelance Work',
      description: 'Web development project',
      amount: 450.00,
      type: 'income',
      category: 'Freelance',
      date: new Date('2023-10-28T11:20:00'),
      icon: this.Laptop,
      color: '#3B82F6',
      status: 'completed',
      paymentMethod: 'Bank Transfer',
      reference: 'FR-2023-10',
      notes: 'Project: Company Website Redesign'
    },
    {
      id: 6,
      title: 'Online Course',
      description: 'Advanced Angular Course',
      amount: 129.99,
      type: 'expense',
      category: 'Education',
      date: new Date('2023-10-25T15:10:00'),
      icon: this.BookOpen,
      color: '#8B5CF6',
      status: 'completed',
      paymentMethod: 'Credit Card',
      reference: 'CRS-901234'
    },
    {
      id: 7,
      title: 'Gym Membership',
      description: 'Monthly gym membership',
      amount: 45.00,
      type: 'expense',
      category: 'Health',
      date: new Date('2023-10-20T08:30:00'),
      icon: this.Dumbbell,
      color: '#EC4899',
      status: 'completed',
      paymentMethod: 'Direct Debit',
      reference: 'GYM-567890'
    }
  ];
  
  // Pagination
  currentPage = 1;
  itemsPerPage = 5;
  sortField = 'date';
  sortDirection: 'asc' | 'desc' = 'desc';
  
  // Filtered transactions based on search and filter criteria
  filteredTransactions: Transaction[] = [];
  currentFilter: string = 'all';
  searchQuery: string = '';
  
  // Initialize filtered transactions
  ngOnInit() {
    console.log('[Dashboard] Component initialized');
    console.log(`[Dashboard] Loading ${this.recentTransactions.length} transactions`);
    this.filteredTransactions = [...this.recentTransactions];
    console.log('[Dashboard] Transactions loaded and filtered:', this.filteredTransactions);
  }
  
  // Get current transactions with pagination and sorting
  get paginatedTransactions() {
    console.log('[Dashboard] Getting paginated transactions', {
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage,
      totalItems: this.filteredTransactions.length,
      sortField: this.sortField,
      sortDirection: this.sortDirection
    });

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    
    // Apply sorting
    const sorted = [...this.filteredTransactions].sort((a, b) => {
      const [field, direction] = this.sortField.split(':');
      let comparison = 0;
      
      if (field === 'date') {
        comparison = a.date.getTime() - b.date.getTime();
      } else if (field === 'amount') {
        comparison = a.amount - b.amount;
      } else {
        // For string fields
        const aValue = String(a[field as keyof Transaction] || '').toLowerCase();
        const bValue = String(b[field as keyof Transaction] || '').toLowerCase();
        comparison = aValue.localeCompare(bValue);
      }
      
      return direction === 'desc' ? -comparison : comparison;
    });
    
    return sorted.slice(start, end);
  }
  
  // Get total pages for pagination
  get totalPages(): number {
    return Math.ceil(this.filteredTransactions.length / this.itemsPerPage);
  }
  
  // Get pagination pages to display
  getPaginationPages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    
    if (this.totalPages <= maxVisiblePages) {
      // Show all pages if there are few
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, current page, and last page with ellipsis
      pages.push(1);
      
      const startPage = Math.max(2, this.currentPage - 1);
      const endPage = Math.min(this.totalPages - 1, this.currentPage + 1);
      
      if (startPage > 2) {
        pages.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < this.totalPages - 1) {
        pages.push('...');
      }
      
      if (this.totalPages > 1) {
        pages.push(this.totalPages);
      }
    }
    
    return pages;
  }
  
  // Change page
  changePage(page: number | string) {
    if (page === '...') return;
    const newPage = Number(page);
    console.log(`[Dashboard] Changing page from ${this.currentPage} to ${newPage}`);
    this.currentPage = newPage;
    this.scrollToTop();
  }
  
  // Sort transactions
  sortTransactions(sortString: string) {
    const [field, direction] = sortString.split(':');
    console.log(`[Dashboard] Sorting by ${field} in ${direction} order`);
    this.sortField = sortString;
    this.currentPage = 1; // Reset to first page when changing sort
  }
  
  // Filter transactions by type
  setTransactionFilter(type: string) {
    this.currentFilter = type;
    this.currentPage = 1;
    this.applyFilters();
  }
  
  // Filter transactions by search query
  filterTransactions(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value.toLowerCase();
    this.currentPage = 1;
    this.applyFilters();
  }
  
  // Reset all filters and search
  resetFilters() {
    this.currentFilter = 'all';
    this.searchQuery = '';
    this.sortField = 'date:desc';
    this.currentPage = 1;
    this.applyFilters();
  }
  
  // Apply all active filters and search
  applyFilters() {
    console.log('[Dashboard] Applying filters', {
      searchQuery: this.searchQuery,
      currentFilter: this.currentFilter,
      selectedCategory: this.selectedCategory
    });

    this.filteredTransactions = this.recentTransactions.filter(transaction => {
      // Apply type filter
      if (this.currentFilter !== 'all' && transaction.type !== this.currentFilter) {
        return false;
      }
      
      // Apply search query
      if (this.searchQuery) {
        const searchStr = [
          transaction.title,
          transaction.description,
          transaction.category,
          transaction.paymentMethod,
          transaction.reference,
          transaction.amount.toString(),
          transaction.date.toLocaleDateString(),
          transaction.status,
          transaction.tags?.join(' ')
        ].join(' ').toLowerCase();
        
        if (!searchStr.includes(this.searchQuery)) {
          return false;
        }
      }
      
      return true;
    });
  }
  
  // Get icon for payment method
  getPaymentMethodIcon(method: string): any {
    const icons: {[key: string]: any} = {
      'Credit Card': this.CreditCard,
      'Bank Transfer': this.Banknote,
      'Direct Debit': this.Repeat,
      'Mobile Payment': this.Smartphone,
      'Cash': this.DollarSign,
      'PayPal': this.DollarSign,
      'Crypto': this.Bitcoin
    };
    
    return icons[method] || 'credit-card';
  }
  
  // Scroll to top of transactions list
  private scrollToTop() {
    const element = document.querySelector('.transactions-list');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Summary cards data
  summaryCards: SummaryCard[] = [];

  constructor(@Inject(LOCALE_ID) private locale: string) {
    this.formattedTotal = this.formatCurrency(this.total);
    this.formattedIncome = this.formatCurrency(this.income);
    this.formattedExpenses = this.formatCurrency(this.expenses);
    this.formattedSavings = this.formatCurrency(this.savings);
    
    // Calcular el total gastado
    this.totalSpent = this.spendingCategories.reduce((sum, category) => sum + category.amount, 0);
    
    // Calcular porcentajes basados en el total gastado
    this.spendingCategories.forEach(category => {
      category.percentage = Math.round((category.amount / this.totalSpent) * 100);
    });

    // Initialize summary cards with inline styles
    this.summaryCards = [
      {
        title: 'Total Balance',
        amount: 12500,
        icon: this.Wallet,
        trend: 'up',
        change: 12.5,
        style: 'background-color: #E0E7FF; color: #4F46E5'
      },
      {
        title: 'Income',
        amount: 4500,
        icon: this.TrendingUp,
        trend: 'up',
        change: 8.2,
        style: 'background-color: #D1FAE5; color: #059669'
      },
      {
        title: 'Expenses',
        amount: 3200,
        icon: this.TrendingDown,
        trend: 'down',
        change: 3.8,
        style: 'background-color: #FEE2E2; color: #DC2626'
      },
      {
        title: 'Savings',
        amount: 1369.20,
        icon: this.PiggyBank,
        trend: 'up',
        change: 5.6,
        style: 'background-color: #EFF6FF; color: #2563EB'
      }
    ];
  }

  // Format currency
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  }

  // Change category
  changeCategory(name: string): void {
    this.selectedCategory = name;
    console.log('Category changed to:', this.selectedCategory);
  }

  // Change time filter
  setTimeFilter(filter: 'week' | 'month' | 'year'): void {
    this.timeFilter = filter;
    console.log('Time filter changed to:', this.timeFilter);
  }

  // Get transaction icon
  getTransactionIcon(type: string): any {
    switch(type) {
      case 'income':
        return this.TrendingUp;
      case 'expense':
        return this.TrendingDown;
      default:
        return this.CreditCard;
    }
  }

  // Get transaction color
  getTransactionColor(type: string): string {
    return type === 'income' ? 'text-green-600' : 'text-red-600';
  }

  // Get icon name from Lucide icon component
  getIconName(icon: any): string {
    if (!icon) return 'circle';
    // If it's already a string, return it directly
    if (typeof icon === 'string') return icon.toLowerCase();
    // Try to get the name from the component
    return (icon.name || 'circle').toLowerCase();
  }

  // Get transaction icon name
  getTransactionIconName(type: string): string {
    const icon = this.getTransactionIcon(type);
    return this.getIconName(icon);
  }
}
