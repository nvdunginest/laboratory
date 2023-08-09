using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Laboratory.Web.Api.Models;

[Table("request_logs")]
public class RequestLog
{
    [Key]
    [Column("id")]
    public Guid Id { get; private set; }

    [Column("time", TypeName = "timestamp without time zone")]
    public DateTime Time { get; private set; }

    [Column("user")]
    public string User { get; private set; }

    [Column("action_type")]
    public int ActionType { get; private set; }

    [ForeignKey(nameof(Request))]
    [Column("request_id")]
    public Guid RequestId { get; private set; }
    public Request Request { get; private set; }

    public RequestLog(DateTime time, string user, int actionType, Guid requestId)
    {
        this.Id = Guid.NewGuid();
        this.Time = time;
        this.User = user;
        this.ActionType = actionType;
        this.RequestId = requestId;
    }
}