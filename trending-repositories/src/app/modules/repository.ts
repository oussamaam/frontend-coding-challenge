export interface Repository {
    repoUrl:string;
    name:string;
    description:string;
    ownerAvatar:string;
    ownerName:string;
    nbStars:string;
    nbIssues:string;
    timeInterval:number;
  
  }
  export class RepositoryObj implements Repository {
    repoUrl:string;
    name:string;
    description:string;
    ownerAvatar:string;
    ownerName:string;
    nbStars:string;
    nbIssues:string;
    timeInterval:number;
  
    constructor(item,now) {
      this.name = item.name;
      this.repoUrl = item.html_url;
      this.description= item.description;
      this.ownerAvatar = item.owner.avatar_url;
      this.ownerName = item.owner.login;
      this.nbStars = ((item.stargazers_count < 1000) ? ''+item.stargazers_count : (item.stargazers_count/1000).toFixed(2)+'k'); 
      this.nbIssues = ((item.open_issues < 1000) ? ''+item.open_issues : (item.open_issues/1000).toFixed(2)+'k');
      this.timeInterval=Math.round((now.getTime()-new Date(item.created_at).getTime())/(1000*60*60*24));
    }
  }