import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    children: [
      { path: '', loadChildren: () => import('app/modules/pagos/pagos.module').then(m => m.PagosModule) },

    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash:true}),
  ],
  exports: [RouterModule]  
})
export class AppRoutingModule { }
