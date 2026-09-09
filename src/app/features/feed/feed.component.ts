import { afterNextRender, Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { Post } from '../../core/models/posts.interface';
import { PostsServer } from '../../core/services/post/posts.server';
import { CreatePostComponent } from '../../shared/components/create-post/create-post.component';
import { SuggestionsComponent } from "./suggestions/suggestions.component";
import { SinglePostComponent } from '../../shared/components/single-post/single-post.component';
import { isPlatformBrowser } from '@angular/common';
import { NotificationsServer } from '../services/notifications.server';
import { initFlowbite } from 'flowbite';
import { ProfileServer } from '../services/profile.server';

@Component({
  selector: 'app-feed',
  imports: [CreatePostComponent, SuggestionsComponent, SinglePostComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent implements OnInit{
  private readonly postServer = inject(PostsServer) ; 
  private readonly notificationsServer = inject(NotificationsServer) ; 
  private readonly profileServer = inject(ProfileServer);
  flag:boolean = false;
  postList: WritableSignal<Post[]> = signal([]);
    private readonly platformId = inject(PLATFORM_ID);

    name: WritableSignal<string> = signal('');
    photo: WritableSignal<string> = signal('');
   
 ngOnInit() {
    // تشغيل جلب المنشورات فقط في المتصفح
    if (isPlatformBrowser(this.platformId)) {
        this.getAllPost();
        this.getunreadCoutNotifications() ;
        this.getProfile();
    }
    
  }

  getProfile(){
  this.profileServer.getProfile().subscribe({
    next: (res) => {
       this.name.set(res.data.user.name);
       this.photo.set(res.data.user.photo);
    },
  })
}

  getAllPost(){
    this.postServer.getAllPost().subscribe({
      next:(res)=>{
        this.postList.set(res.data.posts);
      }
    })
  }
  getunreadCoutNotifications(){
    this.notificationsServer.getUnreadCount().subscribe({
      next(res) {
        localStorage.setItem('unreadCount' , res.data.unreadCount);
      },
    })
  }
}
