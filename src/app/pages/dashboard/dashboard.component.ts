import {Component, OnInit} from '@angular/core';
import {DictionaryService} from '../../service/dictionary.service';
import {HttpClient} from '@angular/common/http';
import {Dictionary} from '../../model/dictionary';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent implements OnInit {
  dictionaries = [] = new Array<Dictionary>();
  transformToDXP: string = 'transformación';
  sourceToDXP: any = '';
  transformToLegacy: string = 'transformación';
  sourceToLegacy: any = '';

  constructor(public dictionaryService: DictionaryService, public httpClient: HttpClient) {
  }

  settings = {
    noDataMessage: 'No hay datos',
    hideHeader: false,
    hideSubHeader: false,
    columns: {
      id: {
        title: 'ID',
      },
      source: {
        title: 'Source',
      },
      codeDXP: {
        title: 'Códico DXP',
      },
      codeLegacy: {
        title: 'Código legado',
      },
      transformValue: {
        title: 'Valor transformación',
      },
    },
    pager: {
      display: true,
      perPage: 5,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
      // addButtonContent: 'Nuevo',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      // editButtonContent: 'Editar',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      // deleteButtonContent: 'Borrar',
      confirmDelete: true,
    },
    actions: {
      columnTitle: 'Acciones',
      add: true,
      edit: true,
      delete: true,
      custom: [],
      position: 'left', // left|right
    },
    attr: {
      class: 'table table-bordered', // <-- tengo que revisar
    },
  };

  ngOnInit() {
    this.loadDictionaries();
  }

  loadDictionaries() {
    this.dictionaryService.getDictionaries().subscribe((result: any) => {
        const idPattern = new RegExp(/([^\/]+$)/g);
        if (result) {
          this.dictionaries = result._embedded.dictionary;
          for (let i = 0; i < result._embedded.dictionary.length; i++) {
            this.dictionaries[i].id = result._embedded.dictionary[i]._links.self.href.split(idPattern)[1];
            // console.info(result._embedded.dictionary[i]._links.self.href.split(pattern)[1]);
          }
        }
      },
      error => (
        console.error(error)
      ),
    );
  }

  addRecord(event) {
    const dictionary =
      new Dictionary(event.newData.id, event.newData.source, event.newData.codeDXP, event.newData.codeLegacy, event.newData.transformValue);

    this.dictionaryService.saveNewDictionary(dictionary).subscribe(
      result => (
        event.confirm.resolve(result.result)
      ),
      error => (
        console.error(error)
      ),
    );
  }

  updateRecord(event: any) {
    const dictionary =
      new Dictionary(event.newData.id, event.newData.source, event.newData.codeDXP, event.newData.codeLegacy, event.newData.transformValue);

    this.dictionaryService.editNewDictionary(dictionary).subscribe(
      result => (
        event.confirm.resolve(result.result)
      ),
      error => (
        console.error(error)
      ),
    );
  }

  deleteRecord(event: any) {
    if (window.confirm('Borrar?')) {
      this.dictionaryService.deleteDictionary(event.data.id).subscribe(
        result => (
          event.confirm.resolve(result)
        ),
        error => (
          console.error(error)
        ),
      );
    } else {
      event.confirm.reject();
    }
  }

  findByLegacyCode(event: any, source: any) {
    console.info(event.target.value);
    this.dictionaryService.findByLegacyCode(event.target.value, source).subscribe(
      (result: any) => {
        if (result) {
          this.transformToDXP = result.transformValue;
        }
      }, error => {
        if (error.status === 404) this.transformToDXP = 'No hay coincidencias';
        console.error(error);
      },
    );
  }

  findByDXPCode(event: any, source: any) {
    console.info(event.target.value);
    this.dictionaryService.findByDXPCode(event.target.value, source).subscribe(
      (result: any) => {
        if (result) {
          this.transformToLegacy = result.transformValue;
        }
      }, error => {
        if (error.status === 404) this.transformToLegacy = 'No hay coincidencias';
        console.error(error);
      },
    );
  }
}
