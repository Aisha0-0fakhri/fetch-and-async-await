const btn = document.getElementById("loadBtn");
const result = document.getElementById("result");

btn.addEventListener("click", () => compareCountries("Pakistan", "Afghanistan"));

// Fetches the population of a single country
async function getPopulation(name) {
  const response = await fetch(
    `https://disease.sh/v3/covid-19/countries/${encodeURIComponent(name)}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data for "${name}" (status ${response.status})`
    );
  }

  const data = await response.json();
  return data.population;
}

// Compares the populations
async function compareCountries(nameA, nameB) {
  try {
    result.textContent = "loading...";

    const [populationA, populationB] = await Promise.all([
      getPopulation(nameA),
      getPopulation(nameB),
    ]);

    let message;
    if (populationA > populationB) {
      message = `${nameA} has ${populationA - populationB} more people than ${nameB}.`;
    } else if (populationB > populationA) {
      message = `${nameB} has ${populationB - populationA} more people than ${nameA}.`;
    } else {
      message = `${nameA} and ${nameB} have the same population.`;
    }

    console.log(message);
    result.textContent = message;
  } catch (error) {
    const errorMessage = `Could not compare countries: ${error.message}`;
    console.error(errorMessage);
    result.textContent = errorMessage;
  }
}