import { Component, Input,Directive } from '@angular/core';

@Directive({ selector: 'panel-button' })
@Directive({ selector: 'panel-body' })
class MyComponentTags { }


@Component({
	moduleId: module.id,
	selector: 'app-control-panel',
	templateUrl: 'control-panel.component.html',
  styleUrls: ['control-panel.component.css']

})
  

export class ControlPanelComponent {

	@Input() label: string;
	@Input() classes: string;
}
