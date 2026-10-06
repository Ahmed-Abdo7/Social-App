import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CardPostComponent } from "../../shared/components/card-post/card-post.component";
import { ProfileServer } from '../services/profile.server';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CardPostComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit{
  private readonly profileServer = inject(ProfileServer); 
  private readonly toastr = inject(ToastrService);
  private readonly platformId = inject(PLATFORM_ID);

  flag: boolean = false;
  isUploadingCover = signal<boolean>(false);
  isUploadingPhoto = signal<boolean>(false);

  toggle(){
    this.flag = !this.flag;
  }

  usersList = signal<any>(null);
  isMyProfile = signal<boolean>(true);


 ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    this.activatedRoute.paramMap.subscribe((params) => {
      const userId = params.get('id');

      if (userId) {

        
        this.profileServer.getUserProfile(userId).subscribe({
          next: (res: any) => {
            const userData = res.data?.user || res.data || res.user;
            this.usersList.set(userData);

            
            this.getPostByUser(userId);

            
            this.isMyProfile.set(false); 
          },
          error: (err) => {
            this.toastr.error('Failed to load profile', 'Social App');
          }
        });
      } else {
      
        this.isMyProfile.set(true);
        this.profileServer.getProfile().subscribe({
          next: (res: any) => {
            this.usersList.set(res.data.user);
            this.getPostByUser(this.usersList()?._id);
          }
        });
        this.getSavedPosts();
      }
    });
  }
}

  private readonly activatedRoute = inject(ActivatedRoute);

  postList: WritableSignal<any[]> = signal([]);
  getPostByUser(userId:string){
    this.profileServer.getMyPosts(userId).subscribe({
      next:(res:any)=>{
        this.postList.set(res.data.posts);
      }
    })  
  }

  mypostsflag = signal<boolean>(true);
  toggleMyPosts(){
    this.mypostsflag.set(true);
    this.savedpostflag.set(false);
  }

  savedpostflag = signal<boolean>(false);
  toggleSavedPosts(){
    this.savedpostflag.set(true);
    this.mypostsflag.set(false);
  }

  savedpostlist = signal<any[]>([]);
  getSavedPosts(){
    this.profileServer.getSavedPosts().subscribe({
      next:(res)=>{
        this.savedpostlist.set(res.data.bookmarks);
      }
    })  
  }

  onPostUnsaved(postId: string) {
    this.savedpostlist.update((posts) => posts.filter((p) => p._id !== postId));
    this.usersList.update((user) =>
      user ? { ...user, bookmarksCount: Math.max(0, (user.bookmarksCount || 1) - 1) } : user
    );
  }

  onPostDeleted(postId: string) {
    this.postList.update((posts) => posts.filter((p) => p._id !== postId));
  }

  selectCoverFile(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.updateCoverPhoto(file);
    }
    event.target.value = '';
  }

  updateCoverPhoto(file: File) {
    this.isUploadingCover.set(true);
    const formData = new FormData();
    formData.append('cover', file);

    this.profileServer.updateCoverPhoto(formData).subscribe({
      next: (res: any) => {
        this.isUploadingCover.set(false);
        if (res.data?.cover) {
          this.usersList.update((user) => (user ? { ...user, cover: res.data.cover } : user));
        }
        this.toastr.success(res.message || 'Cover photo updated successfully', 'Social App');
      },
      error: (err: any) => {
        this.isUploadingCover.set(false);
        this.toastr.error(err?.error?.message || 'Failed to update cover photo', 'Social App');
      }
    });
  }

  selectFile(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.updateProfilePhoto(file);
    }
    event.target.value = '';
  }

  updateProfilePhoto(file: File) {
    this.isUploadingPhoto.set(true);
    const formData = new FormData();
    formData.append('photo', file);

    this.profileServer.updateProfilePhoto(formData).subscribe({
      next: (res: any) => {
        this.isUploadingPhoto.set(false);
        if (res.data?.photo) {
          this.usersList.update((user) => (user ? { ...user, photo: res.data.photo } : user));
        }
        this.toastr.success(res.message || 'Profile photo updated successfully', 'Social App');
      },
      error: (err: any) => {
        this.isUploadingPhoto.set(false);
        this.toastr.error(err?.error?.message || 'Failed to update profile photo', 'Social App');
      }
    });
  }
}
