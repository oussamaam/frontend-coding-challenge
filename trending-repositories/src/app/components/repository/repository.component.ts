import { Component, OnInit } from '@angular/core';
import { RepoDataService } from '../../services/repo-data.service';
import { Repository,RepositoryObj } from 'src/app/modules/repository';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {
  repositories:Repository[]=[];
  now: Date=new Date();
  currentPage:number=1;
  constructor(private RepoData:  RepoDataService) { 
  }

  ngOnInit(): void {
   this.getTrendingRepo();
  }

  goToLink(url: string){
      window.open(url, "_blank");
  }
  getTrendingRepo(){
    this.RepoData.getByPage(this.currentPage).subscribe(
      (res) => {
        this.onSuccess(res.items)
        
      },
      (err) => {
        console.log("error in getting request ",err);
      }
    )
  }
  onSuccess(res) {  
    if (res != undefined) {  
      res.forEach(item => {
        this.repositories.push(new RepositoryObj (item,this.now));
      }); 
    }
     
  }  
  onScroll()  
  {  
    this.currentPage = this.currentPage + 1;  
    this.getTrendingRepo();  
  }
  
}
