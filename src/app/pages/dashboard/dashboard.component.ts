import {Component, OnInit} from '@angular/core';
import {DictionaryService} from '../../service/dictionary.service';
import {HttpClient} from '@angular/common/http';
import {Dictionary} from '../../model/dictionary';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  dictionaries = [] = new Array<Dictionary>();

  constructor(public dictionaryService: DictionaryService, public httpClient: HttpClient) {
  }

  settings = {
    noDataMessage: 'No hay datos',
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
      perPage: 2,
    },
    add: {
      confirmCreate: true,
      addButtonContent: 'Nuevo',
    },
    edit: {
      editButtonContent: 'Editar',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: 'Borrar',
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
    this.dictionaryService.deleteDictionary(event.data.id).subscribe(
      result => (
        event.confirm.resolve(result)
      ),
      error => (
        console.error(error)
      ),
    );
  }
}
