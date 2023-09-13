export default function Page() {
    return <>
        <ul className="notifications"></ul>

        <div className="h-full w-full">
            <div className="container w-full md:w-4/5 xl:w-3/5 mx-auto p-6">

                <div className="flex w-full">
                    <h1 className="text-4xl mx-auto text-white my-6">Gym Record</h1>
                </div>

                <div id='gym-info' className="p-2 mt-6 lg:mt-0 rounded shadow bg-white">
                    <table id="example" className="stripe hover">
                        <thead>
                            <tr className="text-left">
                                <th data-priority="1">Muscle Group</th>
                                <th data-priority="2">Workout</th>
                                <th data-priority="3">Max Weight</th>
                                <th data-priority="4">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>

            <div data-dial-init className="fixed right-6 bottom-6 group">
                <button type="button" data-dial-toggle="speed-dial-menu-default" className="flex items-center justify-center text-white bg-green-700 rounded-full w-14 h-14 hover:bg-green-800 focus:ring-2 focus:ring-green-300 focus:outline-none" id="open-btn">
                    <i className="fas fa-plus"></i>
                </button>
            </div>

            <div className="fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                <div id="defaultModal" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative w-full max-w-2xl max-h-full mx-auto">
                        {/* <!-- Render new workout modal -->
                        <?php include './includes/gym/modal-new-workout.php';?> */}
                    </div>
                </div>
            </div>
        </div>

        {/* <script>
    // Set variables by element
            let modal = document.getElementById("my-modal");

            let btn = document.getElementById("open-btn");

            let close_button = document.getElementById("close-btn");

            let cancel_button = document.getElementById("cancel-btn");

            // Open modal on button click
            btn.onclick = function() {
                modal.style.display = "block";
    }

            // Close modal on button click
            close_button.onclick = function() {
                modal.style.display = "none";
    }

            cancel_button.onclick = function() {
                modal.style.display = "none";
    }

        </script>

        <script type="text/javascript" src="https://code.jquery.com/jquery-3.4.1.min.js"></script>

        <!--Datatables -->
        <script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
        <script src="https://cdn.datatables.net/responsive/2.2.3/js/dataTables.responsive.min.js"></script>
        <script>
            $(document).ready(function() {

        var table = $('#example').DataTable({
                responsive: true
            })
            .columns.adjust()
            .responsive.recalc();
    });

        </script> */}
    </>;
}