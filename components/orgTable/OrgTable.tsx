import type { IOrganization } from "~/types/IOrganization";

interface OrgTableProps {
  OrganizationsFounded: IOrganization[];
}

const OrgTable = ({ OrganizationsFounded }: OrgTableProps) => {
  return (
    <div className="overflow-x-auto max-md:hidden ">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Organization</th>
            <th>Creator</th>
            <th>Members</th>
          </tr>
          {OrganizationsFounded.map((org: IOrganization) => (
            <tr key={org.name} className="hover">
              <td>{org.name}</td>
              <td>{org.ownerName}</td>
              <td>
                <div className="avatar-group -space-x-6">
                  {org.urlImageParicipants.map((participant) => (
                    <div key={participant} className="avatar w-10">
                      <img src={participant} alt="user participant" />
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </thead>
      </table>
    </div>
  );
};

export default OrgTable;
