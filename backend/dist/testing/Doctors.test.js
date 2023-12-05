// __tests__/doctorService.test.ts
import DoctorService from "../services/DoctorService";
import DoctorsRepository from "../repository/doctors";
import { prisma } from "../repository/prisma-repo";
// Mock the DoctorsRepository for testing
jest.mock("../repository/doctors");
describe("DoctorService", () => {
    let doctorsRepo;
    beforeEach(() => {
        // Initialize a new instance of DoctorsRepository for each test
        doctorsRepo = new DoctorsRepository(prisma);
    });
    afterEach(() => {
        // Reset mocks after each test
        jest.clearAllMocks();
    });
    describe("getAllDoctors", () => {
        it("returns all doctors", async () => {
            // Mock the implementation of findDoctors in DoctorsRepository
            //   DoctorsRepository.findDoctors.mockResolvedValueOnce([
            //     { /* mock doctor data */ },
            //     { /* mock doctor data */ },
            //   ]);
            const getAllDoctors = async () => {
                return DoctorService.getAllDoctors();
            };
            const result = await getAllDoctors();
            console.log(result);
            expect(result).toBeDefined();
            // Add more assertions based on your expected behavior
        });
    });
    //   describe("findDoctorByEmail", () => {
    //     it("finds a doctor by email", async () => {
    //       // Mock the implementation of findDoctorByEmail in DoctorsRepository
    //       //   DoctorsRepository.findDoctorByEmail.mockResolvedValueOnce({
    //       //     {email:"doctor@mail.com"}
    //       //   });
    //       const result = await DoctorService.findDoctorByEmail("doctor@mail.com");
    //       expect(result).toBeDefined();
    //       // Add more assertions based on your expected behavior
    //     });
    //   });
    // Add similar describe blocks for other methods (getDoctorToken, createDoctor, etc.)
});
