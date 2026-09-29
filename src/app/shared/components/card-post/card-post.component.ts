import { Component, effect, inject, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { PostsServer } from '../../../core/services/post/posts.server';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card-post',
  imports: [DatePipe],
  templateUrl: './card-post.component.html',
  styleUrl: './card-post.component.css',
})
export class CardPostComponent {
  postList = input<any[]>([]);
  isSaved = input<boolean>(false);
  postUnsaved = output<string>();
  postDeleted = output<string>();

  private readonly postServer = inject(PostsServer);
  private readonly toastr = inject(ToastrService);

  constructor() {
    // كلما تغيرت القائمة ونزلت عناصر جديدة في الـ DOM، يتم تفعيل Flowbite عليها
    effect(() => {
      if (this.postList().length > 0) {
        setTimeout(() => {
          initFlowbite();
        }, 50);
      }
    });
  }

  unsave(postId: string) {
    this.postServer.putPostBookMark(postId).subscribe({
      next: (res: any) => {
        this.toastr.success('Post removed from saved', 'Route Posts');
        this.postUnsaved.emit(postId);
      },
      error: (err) => {
        console.error('Error unsaving post:', err);
      }
    });
  }

  deletePost(postId: string) {
    this.postServer.deletePost(postId).subscribe({
      next: (res: any) => {
        this.toastr.success('Post deleted successfully', 'Route Posts');
        this.postDeleted.emit(postId);
      },
      error: (err) => {
        console.error('Error deleting post:', err);
      }
    });
  }
}
