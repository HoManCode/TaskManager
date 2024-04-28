using TMS.Enum;

namespace TMS.Models;

public class Tasks
{
        private long Id { get; set; }
        private int storyPoints { get; set; }
        private DateTime dueDate{ get; set; }
        private string username{ get; set; }
        private string description{ get; set; }
        private TaskStat status{ get; set; }

}