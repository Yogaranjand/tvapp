import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from "./search.component";
import { SearchService } from './search.service';
import { SharedModule } from '../shared.module';


@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    providers: [SearchService],
    declarations: [
        SearchComponent
    ]
})
export class SearchModule {}
