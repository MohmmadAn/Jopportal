import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Job = { title: string; company: string; location: string; type: string; category: string; salary: string; level: string; posted: string; color: string; logo: string; description: string; status?: string; applications?: number };
type Application = { id: string; job: Job; name: string; email: string; phone: string; location: string; cv: string; date: string; status: string };
@Component({ selector: 'app-root', standalone: true, imports: [CommonModule, FormsModule], templateUrl: './app.component.html', styleUrl: './app.component.css' })
export class AppComponent implements OnInit {
  page = 'Home'; query = ''; location = ''; category = 'All categories'; employment = 'All types'; selectedJob: Job | null = null; showApply = false; submitted = false;
  saved = new Set<string>(); fullName = ''; email = ''; phone = ''; currentLocation = ''; cvName = ''; authName = ''; authEmail = ''; authPhone = ''; authPassword = ''; adminEmail = ''; adminPassword = ''; authMessage = ''; searchCompany = ''; categoryName = ''; newJobTitle = ''; newJobCompany = ''; newJobLocation = 'Amman'; newJobType = 'Full-time'; newJobCategory = 'Development'; newJobSalary = ''; newJobDescription = ''; sortMode = 'Most relevant'; referenceNumber = ''; private applicationCount = 1;
  jobs: Job[] = [
    { title: 'Frontend Engineer', company: 'FinEdge', location: 'Amman', type: 'Full-time', category: 'Development', salary: '$140k–$175k', level: 'Senior', posted: 'Today', color: '#e9e7ff', logo: 'F', description: 'Build accessible, responsive web experiences and collaborate with product designers and backend engineers to ship polished features.', status: 'Active', applications: 88 },
    { title: 'Product Designer (UX)', company: 'Estarta', location: 'Amman', type: 'Full-time', category: 'Design & Creative', salary: '$90k–$120k', level: 'Mid-level', posted: '2 days ago', color: '#e1f5ec', logo: 'E', description: 'Create intuitive user journeys, wireframes, prototypes and production-ready interface designs.', status: 'Active', applications: 75 },
    { title: 'Customer Support Associate', company: 'Golden', location: 'Remote', type: 'Part-time', category: 'Marketing', salary: '$35k–$48k', level: 'Entry-level', posted: 'Today', color: '#fff0dc', logo: 'G', description: 'Help customers solve problems, document recurring issues and improve customer experience.', status: 'Pending', applications: 28 },
    { title: 'Data Analyst', company: 'Northstar', location: 'Irbid', type: 'Full-time', category: 'Finance', salary: '$70k–$95k', level: 'Mid-level', posted: 'Yesterday', color: '#dff0ff', logo: 'N', description: 'Turn data into clear insights, build reports and support data-driven decisions.', status: 'Active', applications: 42 },
    { title: 'Backend Developer', company: 'Atlas Systems', location: 'Remote', type: 'Full-time', category: 'Development', salary: '$100k–$145k', level: 'Mid-level', posted: '3 days ago', color: '#ffe5e8', logo: 'A', description: 'Design reliable APIs, improve database performance and contribute to scalable backend services.', status: 'Active', applications: 98 },
    { title: 'Marketing Specialist', company: 'Bluewave', location: 'Amman', type: 'Part-time', category: 'Marketing', salary: '$40k–$55k', level: 'Entry-level', posted: '4 days ago', color: '#f5e4ff', logo: 'B', description: 'Support campaigns, create engaging content and track performance across digital channels.', status: 'Rejected', applications: 12 }
  ];
  categories = [ {name:'Development', count:45, active:true}, {name:'Finance',count:210,active:true}, {name:'Marketing',count:66,active:true}, {name:'Design & Creative',count:98,active:false} ];
  companies = [ {name:'Globex Technologies', industry:'Software · Data · Cloud', jobs:7, joined:'Jan 12, 2024', active:true, logo:'G'}, {name:'Bluewave Digital Services',industry:'Marketing · UX · Engineering',jobs:10,joined:'Feb 28, 2024',active:true,logo:'B'}, {name:'Umbra Retail Group',industry:'Sales · Merchandising · Logistics',jobs:9,joined:'Apr 03, 2024',active:true,logo:'U'}, {name:'FinEdge',industry:'Financial technology',jobs:12,joined:'May 19, 2024',active:true,logo:'F'}, {name:'Estarta',industry:'Design · Technology',jobs:8,joined:'Jun 02, 2024',active:true,logo:'E'} ];
  seekers = [ {name:'ahmad ahmad',role:'Product Designer',applications:45,joined:'Jan 12, 2024',active:true}, {name:'lama lama',role:'Frontend Engineer',applications:11,joined:'Feb 28, 2024',active:true}, {name:'Mohammd d',role:'Marketing Manager',applications:5,joined:'Apr 03, 2024',active:true}, {name:'Mona maoa',role:'Data Analyst',applications:7,joined:'May 19, 2024',active:true} ];
  applications: Application[] = [];
  get filteredJobs(): Job[] { let list=this.jobs.filter(j => (!this.query || `${j.title} ${j.company} ${j.category}`.toLowerCase().includes(this.query.toLowerCase())) && (!this.location || j.location.toLowerCase().includes(this.location.toLowerCase())) && (this.category === 'All categories' || j.category === this.category) && (this.employment === 'All types' || j.type === this.employment) && j.status !== 'Rejected'); if(this.sortMode==='Newest first') list=[...list].reverse(); return list; }
  get activeJobs(): Job[] { return this.jobs.filter(j=>j.status==='Active'); }
  get pageTitle(): string { return this.page.replace('Admin ',''); }
  ngOnInit(): void { const route=decodeURIComponent(window.location.hash.replace(/^#\/?/,'')); if(route) this.page=route; window.addEventListener('hashchange',()=>{const p=decodeURIComponent(window.location.hash.replace(/^#\/?/,'')); if(p) this.page=p;}); }
  go(page: string): void { this.page = page; this.selectedJob = null; this.showApply = false; this.authMessage=''; history.replaceState(null,'',`#/${encodeURIComponent(page)}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  search(): void { this.go('Find Jobs'); }
  openJob(job: Job): void { this.selectedJob = job; this.go('Job Details'); this.selectedJob=job; }
  toggleSave(job: Job): void { this.saved.has(job.title) ? this.saved.delete(job.title) : this.saved.add(job.title); }
  apply(job: Job): void { this.selectedJob = job; this.showApply = true; this.submitted = false; window.scrollTo({ top: 0, behavior: 'smooth' }); }
  submitApplication(): void { if(!this.selectedJob) return; this.referenceNumber='APP-'+Math.random().toString(36).substring(2,6).toUpperCase()+'-'+Math.random().toString(36).substring(2,6).toUpperCase(); this.applications.unshift({id:this.referenceNumber,job:this.selectedJob,name:this.fullName,email:this.email,phone:this.phone,location:this.currentLocation,cv:this.cvName,date:new Date().toLocaleDateString(),status:'Under Review'}); this.applicationCount++; this.submitted = true; }
  onFile(event: Event): void { const file = (event.target as HTMLInputElement).files?.[0]; if(file && file.size > 10*1024*1024){ alert('File must be 10 MB or smaller.'); (event.target as HTMLInputElement).value=''; return; } this.cvName = file?.name ?? ''; }
  resetFilters(): void { this.query = ''; this.location = ''; this.category = 'All categories'; this.employment = 'All types'; }
  register(): void { if(!this.authName || !this.authEmail || !this.authPassword){this.authMessage='Please complete all required fields.';return;} this.fullName=this.authName;this.email=this.authEmail;this.phone=this.authPhone;this.authMessage='Account created for this demo. You can now explore jobs.'; this.go('Home'); }
  login(): void { if(!this.authEmail || !this.authPassword){this.authMessage='Enter your email and password.';return;} this.fullName=this.authName||this.authEmail.split('@')[0]; this.email=this.authEmail; this.go('Home'); }
  adminLogin(): void { if(!this.adminEmail || !this.adminPassword){this.authMessage='Enter admin email and password.';return;} this.go('Admin Overview'); }
  addCategory(): void { const name=this.categoryName.trim(); if(name && !this.categories.some(c=>c.name.toLowerCase()===name.toLowerCase())) this.categories.push({name,count:0,active:true}); this.categoryName=''; }
  toggleCategory(c: {name:string;count:number;active:boolean}): void { c.active=!c.active; }
  addJob(): void { if(!this.newJobTitle.trim()||!this.newJobCompany.trim()) return; this.jobs.unshift({title:this.newJobTitle,company:this.newJobCompany,location:this.newJobLocation,type:this.newJobType,category:this.newJobCategory,salary:this.newJobSalary||'Salary not specified',level:'Not specified',posted:'Today',color:'#eeeaff',logo:this.newJobCompany[0].toUpperCase(),description:this.newJobDescription||'More details will be provided by the hiring team.',status:'Pending',applications:0}); this.newJobTitle='';this.newJobCompany='';this.newJobSalary='';this.newJobDescription='';this.go('Admin Jobs'); }
  updateJobStatus(job: Job, status: string): void { job.status=status; }
  updateApplicationStatus(app: Application, status: string): void { app.status=status; }
  toggleCompany(c: {active:boolean}): void { c.active=!c.active; }
  toggleSeeker(s: {active:boolean}): void { s.active=!s.active; }
  deleteJob(job: Job): void { this.jobs=this.jobs.filter(j=>j!==job); }
  showNotFound(): void { this.go('404'); }
}
