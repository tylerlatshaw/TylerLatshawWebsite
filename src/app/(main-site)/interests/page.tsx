import VinylRecordCard from '@/components/vinyl-record-card'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Interests',
}

export default function Page() {
  return <>
    <div className="h-full mb-16 md:pb-8 md:mb-28">

      <div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">

        <section className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-4 p-2 w-full">

          <VinylRecordCard />
          <VinylRecordCard />
          <VinylRecordCard />
          <VinylRecordCard />
          <VinylRecordCard />

          {/* <?php
              include './includes/database-connection.php';

              $get_records_sql = "SELECT R.RecordId
              ,R.Name AS 'Album'
              ,R.Year
              ,A.Name AS 'Artist'
              ,R.ImageUrl
              ,R.DiscogUrl
              ,GROUP_CONCAT(G.Name SEPARATOR '%') AS 'Genre'
              FROM `Records.Records` R
              JOIN `Records.RecordToArtist` RTA
              ON R.RecordId = RTA.RecordId
              JOIN `Records.Artists` A
              ON RTA.ArtistId = A.ArtistId
              LEFT JOIN `Records.RecordToGenre` RTG
              ON R.RecordId = RTG.RecordId
              LEFT JOIN `Records.Genres` G
              ON RTG.GenreId = G.GenreId
              GROUP BY R.RecordId
              ORDER BY R.Name ASC";

              $get_records_result = mysqli_query($connection, $get_records_sql);

              if (!$get_records_result) {
                printf("Error: %s\n", mysqli_error($connection));
              exit();
            }

            if ($get_records_result->num_rows > 0) {
                while($row = $get_records_result->fetch_assoc()){
                include './includes/record-card.php';
                }
            } else {
                echo "<br>No Records Found";
            }

            $connection->close();
        ?> */}

        </section>

      </div>
    </div>
  </>
}