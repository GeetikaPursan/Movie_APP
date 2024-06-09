import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MovieData } from 'src/app/interface/movie-data';
import { MovieListService } from 'src/service/movie-list.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  movies: any[] = [];
  selectedMovie: any;
  movie: any = [];
  showModal: boolean = false;
  searchTerm: string = '';
  filteredMovies: any;
  noResultsFound: boolean = false;
  clone: any[] = [];
  showCreateModal: boolean = false;
  addNewMovie: any;
  flag: boolean = false;
  selectedYear: Number = 0;

  constructor(private movieService: MovieListService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getMovieList().subscribe((response) => {
      console.log(response);
      this.movies = response;
      this.clone = [];
      this.movies.forEach((movie) => {
        this.clone.push(movie);
      });
    });
  }

  openModal(movie: any) {
    this.showModal = true;
    this.selectedMovie = movie;
  }

  closeModal(): void {
    this.selectedMovie = null;
    this.showModal = false;
    this.flag = false;
  }

  openAddMovieModal() {
    this.addNewMovie = new MovieData();
    this.showCreateModal = true;

  }

  closeCreateModal(): void {
    this.showCreateModal = false;
    this.addNewMovie = null;

  }

  filterMovie(event: string) {
    this.movies = this.clone.filter((e) =>
      e.title.toLowerCase().includes(event.toLowerCase()) ||
      e.genre.toLowerCase().includes(event.toLowerCase()) ||
      e.plot.toLowerCase().includes(event.toLowerCase()) 
    );
  }
  
  fiterYearByMovie(event: string) {
    console.log(event);
    if(event === "0"){
      this.getMovies();
    }else{
      this.movieService.getMovieByYear(event).subscribe((response) => {
        this.movies = response;
      }
      )
    }

  }

  onSubmit() {
      this.movieService.createMovie(this.addNewMovie).subscribe(
        (response) => {
          this.toastr.success('Post successfully', 'Success');
          this.getMovies();

        },
        (error) => {
          console.error('POST request failed:', error);
        }
      );
    this.closeCreateModal();
  }

  deleteMovie(selectedMovie: any) {
    let movieId = selectedMovie.id;
    this.movieService.delete(movieId)
      .subscribe((response) => {
        this.toastr.success('Movie deleted', 'Success');
        this.getMovies();
        this.closeModal();
      });
  }

  openUpdateMovie(selectedMovie: any) {
    this.flag = true;
    console.log(selectedMovie.title);
  }


  cancel() {
    this.flag = false;
    this.openModal(this.selectedMovie);
  }

  saveUpdateMovie(selectedMovie: any) {
    console.log(selectedMovie);
    this.movieService.updateData(selectedMovie).subscribe(
      (response) => {
        this.toastr.success('Updated successfully', 'Success');
        this.flag = false;
        this.openModal(this.selectedMovie);
      },
      (error) => {
        console.error('Update request failed:', error);
      }
    )
  }

}
