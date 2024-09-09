import db from "../sqlConfig"

export const reviewStudyNote = (req, res) => {
    try {
        const body = req.body
        const data = {
            noteID: body.noteID,
            notePath: body.notePath,
            context: body.noteContext
        }
        const response = fetch('http://localhost:11434/api/chat', data, {stream: false})

        if (response.status == 200) {
            const updateQuery = `UPDATE notes SET noteCategory=` + db.escape(response.data.noteCategory) + ', noteTags=' + db.escape(response.data.noteTags) + ', noteReviewPath=' + db.escape(response.data.noteReviewPath) + ", status=" + db.escape("Ready") + ' WHERE noteID=' + db.escape(data.noteID)
            db.query(updateQuery, (error, result) => {
                if (error){
                    console.log(error)
                }
                if (result){
                    console.log("Study note review complete")
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}