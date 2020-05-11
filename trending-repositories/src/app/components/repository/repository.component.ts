import { Component, OnInit } from '@angular/core';
import { RepoDataService } from '../../services/repo-data.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {
  name="design-resources-for-developers";
  description="Curated list of design and UI resources from stock photos, web templates, CSS frameworks, UI libraries, tools and much more";
  ownerAvatar="https://avatars2.githubusercontent.com/u/5550850?v=4";
  ownerName="bradtraversy";
  nbStars="7.37k";
  nbIssues="18";
  timeInterval=5;
  repoUrl="https://github.com/bradtraversy/design-resources-for-developers";
  constructor(private RepoData:  RepoDataService) { }

  ngOnInit(): void {
    this.RepoData.getByPage(1).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log("err getting repos");
      }
    )
  }

  goToLink(url: string){
    window.open(url, "_blank");
}
}
