using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Laboratory.Web.Api.Models;

[Table("requests")]
public class Request
{
    [Key]
    [Column("id")]
    public Guid Id { get; private set; }

    [Column("owner_email")]
    public string OwnerEmail { get; private set; }

    [Column("created_time")]
    [DataType("timestamp without time zone")]
    public DateTime CreatedTime { get; private set; }

    [Column("status")]
    public int Status { get; private set; }

    [Column("owner_phone")]
    public string OwnerPhone { get; private set; }


    private readonly List<RequestLog> _logs;
    public virtual IReadOnlyCollection<RequestLog> Logs => _logs;

    private readonly List<Attachment> _attachments;
    public virtual IReadOnlyCollection<Attachment> Attachments => _attachments;

    public Request(string ownerEmail, string ownerPhone)
    {
        this.Id = Guid.NewGuid();
        this.OwnerEmail = ownerEmail;
        this.OwnerPhone = ownerPhone;
        this.Status = (int)RequestStatus.New;
        this.CreatedTime = DateTime.Now;

        this._logs = new List<RequestLog>();
        this._attachments = new List<Attachment>();

        this._logs.Add(new RequestLog(this.CreatedTime, this.OwnerEmail, (int)RequestAction.Receive, this.Id));
    }

    public void Receive(string user)
    {
        this.Status = (int)RequestStatus.Received;
        this._logs.Add(new RequestLog(DateTime.Now, user, (int)RequestAction.Receive, this.Id));
    }

    public void Attachment(FileInfo file)
    {

    }

    public void Close(string user)
    {
        this.Status = (int)RequestStatus.Closed;
        this._logs.Add(new RequestLog(DateTime.Now, user, (int)RequestAction.Close, this.Id));
    }
}

public enum RequestStatus
{
    New,
    Received,
    Closed,
    Rejected
}

public enum RequestAction
{
    Receive,
    Close,
    Reject
}