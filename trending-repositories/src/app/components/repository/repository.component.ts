import { Component, OnInit } from '@angular/core';
import { RepoDataService } from '../../services/repo-data.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {
  repositories:repository[];
  now: Date=new Date();
  currentPage:number=1;

  constructor(private RepoData:  RepoDataService) { }

  ngOnInit(): void {
   this.getTrendingRepo(1);
  }

  goToLink(url: string){
      window.open(url, "_blank");
  }
  getTrendingRepo(p){
    this.RepoData.getByPage(p).subscribe(
      (res) => {
        this.repositories=res.items.map(repo => this.getRepository(repo));
      },
      (err) => {
        console.log("error in getting request ",err);
      }
    )
  }
  getRepository(repo) {
    let obj = {};
    obj["name"] = repo.name;
    obj["repoUrl"] = repo.html_url;
    obj["description"] = repo.description;
    obj["ownerAvatar"] = repo.owner.avatar_url;
    obj["ownerName"] = repo.owner.login;
    obj["nbStars"] = ((repo.stargazers_count < 1000) ? ''+repo.stargazers_count : (repo.stargazers_count/1000).toFixed(2)+'k'); 
    obj["nbIssues"] = ((repo.open_issues < 1000) ? ''+repo.open_issues : (repo.open_issues/1000).toFixed(2)+'k');
    obj["timeInterval"]=Math.round((this.now.getTime()-new Date(repo.created_at).getTime())/(1000*60*60*24));
    return obj;
}
}

interface repository {
  repoUrl:string;
  name:string;
  description:string;
  ownerAvatar:string;
  ownerName:string;
  nbStars:string;
  nbIssues:string;
  timeInterval:number;

}
