import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { CommentsServer } from '../../../../core/services/comments/comments.server';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments',
  imports: [DatePipe, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit  {
  private readonly commentsServer = inject(CommentsServer); 
  @Input() postId!:string;
  comments = signal<any[]>([]);

  ngOnInit(): void {
    this.getAllComments(this.postId);
  }
  getAllComments(postId:string){
    this.commentsServer.getPostComments(postId).subscribe({
      next:(response)=>{
        this.comments.set(response.data.comments);
        
        
      }
    })
  } 
likedList = signal<any[]>([]);
  putLikeToComment(postId:string , commentId:string){
    this.commentsServer.putLikeToComment(postId , commentId).subscribe({
      next:(response)=>{
                  const updatedCommentData = response.data.comment || response.data;
      const newLikesCount = response.data.likesCount;
      this.comments.update(oldComments =>
        oldComments.map(comment => {
          if (comment._id === commentId) {
            return {
              ...comment,
              ...updatedCommentData,
              // تحديث عدد الاعجابات
              likesCount: newLikesCount ?? updatedCommentData?.likesCount ?? (comment.likesCount ? comment.likesCount + 1 : 1)
            };
          }
          return comment;
        })
      );
    }
  });
  }

  createComment :FormGroup = new FormGroup({
    content : new FormControl('', Validators.required) 
  })

   uploadFile: File | null = null;
onFileSelected(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    this.uploadFile = target.files[0];
    
    }
  }

  createCommentSubmit(e :Event){
    e.preventDefault() ; 
   const formData = new FormData(); 
    formData.append('content', this.createComment.get('content')?.value) ; 
    if (this.uploadFile) {
    formData.append('image', this.uploadFile);
  }
  this.commentsServer.createComment(this.postId , formData).subscribe({
     next:(res)=>{
      if(res.success){
        this.createComment.reset() ; 
        this.uploadFile = null;
        this.getAllComments(this.postId);
      }

     }
  })
  }
}

  
