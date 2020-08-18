import {NgModule} from '@angular/core'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatListModule} from '@angular/material/list'
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatTableModule} from '@angular/material/table'

@NgModule({
  exports: [
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
  ],
})
export class AppMaterialModule {}
