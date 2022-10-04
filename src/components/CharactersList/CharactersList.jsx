import { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import './CharactersList.css';

const CharactersList = () => {
	const [characters, setCharacters] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [films, setFilms] = useState([]);

	useEffect(() => {
		const url = 'https://swapi.dev/api/people/';

		const getCharacters = async () => {
			const { data } = await axios(url);

			setCharacters(data.results);
		};

		getCharacters();
	}, []);

	useEffect(() => {
		let url = 'https://swapi.dev/api/people/';

		const getCharacters = async () => {
			if (currentPage > 1) {
				url = `https://swapi.dev/api/people/?page=${currentPage}`;
			}

			const { data } = await axios(url);

			setCharacters(data.results);
		};

		getCharacters();
	}, [currentPage]);

	const columns = [
		{
			name: 'Name',
			selector: (row) => row.name,
		},
		{
			name: 'Height',
			selector: (row) => row.height,
		},
		{
			name: 'Mass',
			selector: (row) => row.mass,
		},
		{
			name: 'Hair color',
			selector: (row) => row.hair_color,
		},
		{
			name: 'Skin color',
			selector: (row) => row.skin_color,
		},
		{
			name: 'Movies',
			selector: (row) => row.films,
		},
	];

	return (
		<>
			<DataTable columns={columns} data={characters} />

			<div className="pagination">
				<button
					className="button_prev"
					onClick={() => {
						if (currentPage > 1) {
							setCurrentPage(currentPage - 1);
						}
						return;
					}}
				>
					prev
				</button>
				<p className="pagination_number">{currentPage}</p>
				<button
					className="button_prev"
					onClick={() => {
						if (currentPage < 9) {
							setCurrentPage(currentPage + 1);
						}
						return;
					}}
				>
					next
				</button>
			</div>
		</>
	);
};

export default CharactersList;
