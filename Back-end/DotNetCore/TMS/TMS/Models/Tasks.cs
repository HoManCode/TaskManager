using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TMS.Enum;

namespace TMS.Models;

public class Tasks
{
        [Key]
        public int Id { get; set; }
        [Column("story_points")]
        public int storyPoints { get; set; }
        [Column("due_date")]
        public DateTime dueDate{ get; set; }
        public string username{ get; set; }
        public string description{ get; set; }
        public TaskStat status{ get; set; }

}