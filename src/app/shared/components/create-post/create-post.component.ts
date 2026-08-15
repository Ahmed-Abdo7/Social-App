
import { afterNextRender, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { PostsServer } from '../../../core/services/post/posts.server';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-post',
  imports: [ ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  
    private readonly postsServer = inject(PostsServer)
    private readonly toasts = inject(ToastrService);
    
    constructor() {
      afterNextRender(() => {
        initFlowbite();
      });
    }
  
  isSlected: boolean = false;
  
  createForm = new FormGroup({
    body : new FormControl('', Validators.required),
  })

  uploadFile: File | null = null;
onFileSelected(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    this.uploadFile = target.files[0];
    this.isSlected = true;
  }

}

onSubmit(e : Event){
  e.preventDefault();
  const formData = new FormData();
  formData.append('body', this.createForm.value.body!);
  if (this.uploadFile) {
    formData.append('image', this.uploadFile);
  }
  this.postsServer.createPost(formData).subscribe({
    next : (res) => {
      if(res.success){
        this.toasts.success(res.message , 'Social App');
      this.createForm.reset();
      this.uploadFile = null;
      this.isSlected = false;
    }

    }
  })
}

}
