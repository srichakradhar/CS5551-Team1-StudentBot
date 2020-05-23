import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ModalModule } from "ngx-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ChatbotComponent } from "./chatbot/chatbot.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { MainComponent } from "./pages/main/main.component";
import { ResponsePageIframeComponent } from "./pages/response-page-iframe/response-page-iframe.component";
import { SafePipe } from "./pipes/safe.pipe";
import { AgmCoreModule } from "@agm/core";
import { AgmDirectionModule } from "agm-direction";
import { MapComponent } from "./components/map/map.component";
import { PathwayComponent } from "./pages/pathway/pathway.component";

@NgModule({
  declarations: [
    AppComponent,
    ChatbotComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    ResponsePageIframeComponent,
    SafePipe,
    MapComponent,
    PathwayComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      // @agm/core
      apiKey: "AIzaSyBsQomdwDRc5IN4Oz-UyS-uATPni6WdCQg",
      libraries: ["places", "geometry"],
    }),
    AgmDirectionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
