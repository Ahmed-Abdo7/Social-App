import { DatePipe } from '@angular/common';
import { afterNextRender, Component, inject, input, output, signal } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Like } from '../../../core/models/likes-data.interface';
import { Post } from '../../../core/models/posts.interface';
import { PostsServer } from '../../../core/services/post/posts.server';
import { FollowingServer } from '../../../features/services/following.server';
import { CommentsComponent } from './comments/comments.component';
import { ToastrService } from 'ngx-toastr';
import { ProfileServer } from '../../../features/services/profile.server';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-post',
  imports: [DatePipe,CommentsComponent],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css',
})
export class SinglePostComponent  {

  constructor() {
    afterNextRender(() => {
      initFlowbite();
    });
  }

 private readonly router = inject(Router);
  private readonly followingServer = inject(FollowingServer);
  private readonly profileServer = inject(ProfileServer);
  private readonly postsService = inject(PostsServer);
  private readonly toastr = inject(ToastrService);
  post = input.required<Post>();
  currentUserId = input<string>('');
  postShared = output<void>();
  postDeleted = output<string>();
  isLiked = signal(false);
   
  // Likes modal state
  likes = signal<Like[]>([]);
  isLoadingLikes = signal(false);
  showLikesModal = signal(false);



  getAllLikes(postID: string) {
    this.showLikesModal.set(true);
    this.isLoadingLikes.set(true);
    
    this.postsService.getPostLikes(postID).subscribe({
      next: (response) => {
        this.likes.set(response.data.likes || []);
        this.isLoadingLikes.set(false);
      },
      error: (err) => {
        console.error('Error fetching likes:', err);
        this.isLoadingLikes.set(false);
      }
    });
  }

  closeModal() {
    this.showLikesModal.set(false);
  }
 
  flag = signal(false);
  followUser(userId:string){
    this.followingServer.followUser(userId).subscribe((res)=>{
      this.flag.set(res.data.following);
    })
  }

  putLike(postId:string){
    this.postsService.putPostLike(postId).subscribe((res)=>{
      this.isLiked.set(res.data.liked);
    })
  }

  showCommentsModal = signal(false);
  toggleCommentsModal(){
    this.showCommentsModal.set(!this.showCommentsModal());
  }
  isBookmarked = signal(false);
  putBookMark(postId:string){
    this.postsService.putPostBookMark(postId).subscribe({
      next:(res)=>{
        this.isBookmarked.set(res.data.bookmarked);
      }
    })
  }
  sherePost(postId:string){
    this.postsService.sherePost(postId).subscribe({
      next:(res:any)=>{
        this.toastr.success('Post shared successfully', 'Route Posts');
        this.postShared.emit();
      },
      error: (err) => {
        console.error('Error sharing post:', err);
      }
    })
  }

  deletePost(postId: string) {
    this.postsService.deletePost(postId).subscribe({
      next: (res: any) => {
        this.toastr.success('Post deleted successfully', 'Route Posts');
        this.postDeleted.emit(postId);
      },
      error: (err) => {
        console.error('Error deleting post:', err);
      }
    });
  }

  goToProfile(userId: string) {
  if (userId) {
    this.router.navigate(['/profile', userId]);
  }
}
}

