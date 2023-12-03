export const stoGetRecordData =
    `
        SELECT R.RecordId
        ,R.Name AS 'RecordName'
        ,R.Year
        ,R.ImageUrl
        ,R.DiscogsUrl
        ,RTA.ArtistId
        ,A.Name AS 'ArtistName'
        ,GROUP_CONCAT( DISTINCT CONCAT(RTG.GenreId, '%', G.Name) ORDER BY G.Name SEPARATOR ',' ) as 'Genres'
    FROM Records R 
    JOIN RecordToArtist RTA
    ON R.RecordId = RTA.RecordId
    JOIN Artists A
    ON RTA.ArtistId = A.ArtistId
    LEFT JOIN RecordToGenre RTG
    ON R.RecordId = RTG.RecordId
    LEFT JOIN Genres G
    ON RTG.GenreId = G.GenreId 
    GROUP BY R.RecordId
        ,R.Name
        ,R.Year
        ,R.ImageUrl
        ,R.DiscogsUrl
        ,RTA.ArtistId
        ,A.Name
    ORDER BY R.Name;
        `;