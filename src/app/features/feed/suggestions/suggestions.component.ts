import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { FollowingServer } from '../../services/following.server';
import { Suggestion } from '../../models/following.interface';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-suggestions',
  imports: [],
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.css',
})
export class SuggestionsComponent implements OnInit
 {
  private readonly followingServer = inject(FollowingServer) ; 
    private readonly platformId = inject(PLATFORM_ID); 
  following = signal<Suggestion[]>([]);
   ngOnInit(): void {
    // تشغيل جلب الاقتراحات فقط في المتصفح
    if (isPlatformBrowser(this.platformId)) {
      this.fetchSuggestions();
    }
  }

  fetchSuggestions(){
    this.followingServer.getSuggestions().subscribe((res)=>{
      this.following.set(res.data.suggestions);
      
    })
  }
  isFollowing:boolean = false;

  followUser(userId:string){
    this.followingServer.followUser(userId).subscribe((res)=>{
    
      this.fetchSuggestions();
    })
  }

}
