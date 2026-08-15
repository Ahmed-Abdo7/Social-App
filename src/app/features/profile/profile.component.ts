import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { CardPostComponent } from "../../shared/components/card-post/card-post.component";
import { ProfileServer } from '../services/profile.server';

@Component({
  selector: 'app-profile',
  imports: [CardPostComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit{
  private readonly profileServer =inject(ProfileServer); 
  flag: boolean = false ;
  toggle(){
    this.flag=!this.flag;
    
  }
    private readonly platformId = inject(PLATFORM_ID);
usersList = signal<any>(null);
ngOnInit(): void {
    // 🟢 تشغيل الطلب فقط في المتصفح أينما يوجد token في localStorage
    if (isPlatformBrowser(this.platformId)) {
      this.profileServer.getProfile().subscribe({
        next: (res: any) => {
          this.usersList.set(res.data.user);
          this.getPostByUser(this.usersList()?._id);
          
        }
      });
      this.getSavedPosts();
    }
    
  }
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

  photo : File | null = null;
  selectFile(event: any) {
    if(event.target.files.length > 0){
      this.photo = event.target.files[0];
      this.updateProfilePhoto();
    }
  }

  updateProfilePhoto(){
    const formData = new FormData();
    formData.append('photo', this.photo || '');
    this.profileServer.updateProfilePhoto(formData).subscribe({
      next:(res:any)=>{
        console.log(res);
      }
    })
  }


}
